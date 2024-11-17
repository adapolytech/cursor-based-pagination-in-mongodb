import { Collection } from "mongodb";

export class UsersRepository {

    static collectionName = "node_app.users";
    /**
     * @type {Collection}
     */
    static collection = null

    static injectDB(db) {
        console.log(db);
        db.createCollection(this.collectionName)
        this.collection = db.collection(this.collectionName);
    }

    static async findOne(_id) {
        return this.collection.findOne({ _id })
    }

    static async insertOne(document) {
        const { insertedId } = await this.collection.insertOne(document);
        return insertedId
    }
}