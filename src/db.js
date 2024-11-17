import { EventEmitter } from "events";
import { MongoClient } from "mongodb";
import { UsersRepository } from "./users/repository.js";

export class DB extends EventEmitter {

    constructor() {
        super()
        this.mongoClient = new MongoClient(process.env.MONGO_URL, { monitorCommands: true });
        this.init_db()
    }

    async init_db() {
        try {
            await this.mongoClient.connect();
            this.mongoClient.on("serverHeartbeatSucceeded")
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
            console.log("Connexion MongoDB fermée.");
        } catch (error) {
            console.error("Erreur lors de la fermeture de la connexion:", error);
        }
    }

    init_repository() {
        UsersRepository.injectDB(this.db)
    }
}