import { EventEmitter } from "events";
import { MongoClient } from "mongodb";
import { UsersRepository } from "./users/users.repository.js";

export class DB extends EventEmitter {

    constructor() {
        super()
        if (!process.env.MONGO_URL) this.emit("error", new Error("MONGO URL is required to start app"))
        this.mongoClient = new MongoClient(process.env.MONGO_URL, { monitorCommands: true });
        this.init_db()
    }

    async init_db() {
        try {
            await this.mongoClient.connect();
            this.db = this.mongoClient.db("node_app");
            this.init_repository()
            this.emit("success", this.db);
        } catch (error) {
            this.emit("error", error)
        }
    }

    async close_db() {
        try {
            await this.mongoClient.close();
        } catch (error) {
            console.error("Impossible de férmer la connexion", error);
        }
    }

    init_repository() {
        UsersRepository.injectDatabase(this.db)
    }
}