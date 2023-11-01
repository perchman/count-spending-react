const { v4: uuidv4 } = require('uuid');
const ServiceLocator = require("./ServiceLocator");

module.exports = class MongoDBActiveRecordModel {
    constructor(uuid) {
        this.uuid = uuid;
    }

    static getEntityName() {
        throw new Error("This method in not implemented");
    }

    static getDatabaseName() {
        throw new Error("This method in not implemented");
    }

    static getDatabase() {
        return ServiceLocator.get(this.getDatabaseName());
    }

    static makeModel() {
        throw new Error("This method in not implemented");
    }

    static async getCount() {
        const db = await this.getDatabase().db;
        const collection = db.collection(this.getEntityName());

        return await collection.countDocuments();
    }

    static async getAllRaw() {
        const db = await this.getDatabase().db;
        const collection = db.collection(this.getEntityName());

        return await collection.find().toArray();
    }

    static async getAllSorted(orderBy) {
        const [key, direction] = orderBy.split(' ');

        const db = await this.getDatabase().db;
        const collection = db.collection(this.getEntityName());

        return await collection
            .find()
            .sort({ [key]: direction === 'asc' ? 1 : -1 })
            .toArray();
    }

    static async getPart(orderBy, pageNum, pageSize) {
        const [key, direction] = orderBy.split('_');

        const db = await this.getDatabase().db;
        const collection = db.collection(this.getEntityName());

        return await collection
            .find()
            .sort({ [key]: direction === 'asc' ? 1 : -1 })
            .skip((pageNum - 1) * pageSize)
            .limit(pageSize)
            .toArray();;
    }

    static async getByUuidRaw(uuid) {
        const db = await this.getDatabase().db;
        const collection = db.collection(this.getEntityName());

        return await collection.findOne({ uuid: uuid});
    }

    static async getByUuid(uuid) {
        const obj = await this.getByUuidRaw(uuid);

        return this.makeModel(obj);
    }

    validate() {
        throw new Error("this method in not implemented");
    }

    toJSON() {
        throw new Error("this method in not implemented");
    }

    async save() {
        this.validate();

        if (!this.uuid) {
            const uuid = uuidv4();
            this.uuid = uuid;
        }

        const db = await this.constructor.getDatabase().db;
        const collection = db.collection(this.constructor.getEntityName());

        const result = await collection.findOneAndUpdate(
            { uuid: this.uuid },
            { $set: this.toJSON() },
            { upsert: true }
        );
    }

    async delete() {
        const db = await this.constructor.getDatabase().db;
        const collection = db.collection(this.constructor.getEntityName());

        const result = await collection.deleteOne({ uuid: this.uuid });
    }
}