import { ObjectId } from "mongodb";
import { UsersRepository } from "./users.repository.js";

export class UsersService {

    constructor() { }

    static async insertOne(document) {
        const data = {
            ...document,
            _id: new ObjectId(),
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
        await UsersRepository.insertOne(data)
        return data;
    }

    static async find(input = {}) {
        let query = {};
        const limit = +input.limit || 10;

        const sort = { createdAt: -1 }; // sortinf DESC by default

        if (input.previous_cursor) {
            sort.createdAt = 1;
            query = { createdAt: { $gt: +input.previous_cursor } }
        }
        if (input.next_cursor) {
            sort.createdAt = -1;
            query = { createdAt: { $lt: +input.next_cursor } }
        }

        let data = await UsersRepository.find(query, { sort, limit })
        if (!data.length) return [];
        // Reverse data to sort descending
        if (input.previous_cursor) data = data.reverse()

        const [firstItem, lastItem] = [data[0].createdAt, data[data.length - 1].createdAt]
        let has_previous, has_next;
        has_next = !!(await UsersRepository.findOne({ createdAt: { $lt: lastItem } }));
        has_previous = !!(await UsersRepository.findOne({ createdAt: { $gt: firstItem } }));

        return {
            data,
            previous_cursor: has_previous ? firstItem : null,
            next_cursor: has_next ? lastItem : null
        }
    }
}