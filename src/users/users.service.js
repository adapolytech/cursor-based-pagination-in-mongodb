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
        return UsersRepository.find(query);
    }
}