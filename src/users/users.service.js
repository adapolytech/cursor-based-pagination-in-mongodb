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

    static async find(query = {}) {
        const data = await UsersRepository.find(query, { sort: { createdAt: -1 }, limit: 10 })
        if (data.length) return [];
        const [firstItem, lastItem] = [data[0].createdAt, data[data.length - 1].createdAt]
        let has_previous, has_next;
        has_next = await UsersRepository.find({ createdAt: { lt: lastItem } });
        has_previous = await UsersRepository.find({ createdAt: { $gt: firstItem } })
        return {
            data,
            has_previous,
            has_next,
            previous_cursor: firstItem,
            next_cursor: lastItem
        }
    }
}