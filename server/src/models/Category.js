const MongoDBActiveRecordModel = require('../MongoDBActiveRecordModel');
module.exports = class Category extends MongoDBActiveRecordModel {
    constructor(uuid, name) {
        super(uuid);
        this.name = name;
        this.validate(name);
    }

    static getEntityName() {
        return 'category';
    }

    static getDatabaseName() {
        return 'Default';
    }

    validate() {
        if (typeof this.name !== "string") {
            throw new Error("Invalid data type for name of category. Type must be a string");
        }
    }

    static makeModel(data) {
        return new Category(
            data.uuid,
            data.name
        );
    }

    static async create(name) {
        const category = new Category(
            null,
            name
        )

        await category.save();

        return category;
    }

    toJSON() {
        let obj = {
            uuid: this.uuid,
            name: this.name
        }

        return obj;
    }

    async checkCanRemove() {
        const db = await this.constructor.getDatabase().db;
        const collection = db.collection('cost');

        const costs = await collection.find().toArray();

        for (let cost in costs) {
            if (costs[cost].category.uuid === this.uuid) {
                throw new Error(`Can't delete category ${this.name}. The category has costs.`);
            }
        }
    }

    async delete() {
        await this.checkCanRemove();
        await super.delete();
    }
}