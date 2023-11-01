const MongoDBActiveRecordModel = require('../MongoDBActiveRecordModel');
const Balance = require('./balance/Balance');
const Category = require('./Category');

module.exports = class Cost extends MongoDBActiveRecordModel {
    constructor(uuid, date, category, price, description) {
        super(uuid);
        this.date = date;
        this.category = category;
        this.price = price;
        this.description = description;

        this.validate();

        this.initData = {
            date: date,
            category: category,
            price: price,
            description: description
        }
    }

    static getEntityName() {
        return 'cost';
    }

    static getDatabaseName() {
        return 'Default';
    }

    validate() {
        this.validateDate();
        this.validateCategory();
        this.validatePrice();
        this.validateDescription();
    }

    validateDate() {
        if (typeof this.date !== "object") {
            throw new Error("Invalid data type for date. Type must be a object");
        }
        if (!this.date instanceof Date) {
            throw new Error("Invalid data type for date. Object must be an instance of the Date object");
        }
    }

    validatePrice() {
        if (typeof this.price !== "number") {
            throw new Error("Invalid data type for price. Type must be a number");
        }
    }

    validateDescription() {
        if (typeof this.description !== "string") {
            throw new Error("Invalid data type for description. Type must be a string");
        }
    }

    validateCategory() {
        if (typeof this.category !== "object") {
            throw new Error("Invalid data type for category. Type must be a object");
        }
        if (!this.category instanceof Category) {
            throw new Error("Invalid data type for category. Object must be an instance of the Category class");
        }
    }

    static async makeModel(data) {
        return new Cost(
            data.uuid,
            new Date(data.date),
            await Category.getByUuid(data.category.uuid),
            data.price,
            data.description
        );
    }

    static async create(date, category, price, description) {
        const cost = new Cost(
            null,
            date,
            category,
            price,
            description
        )

        await cost.save();

        return cost;
    }

    // static async existsCostsHasCategory(categoryUuid) {
    //     const costs = await Cost.getAllRaw();
    //     for (let cost in costs) {
    //         if (costs[cost].category.uuid === categoryUuid) {
    //             return true;
    //         }
    //     }
    //     return false;
    // }

    toJSON() {
        let obj = {
            uuid: this.uuid,
            date: new Date(this.date).getTime(),
            category: this.category.toJSON(),
            price: this.price,
            description: this.description
        }

        if (!this.uuid) {
            delete obj.uuid;
        }

        return obj;
    }

    async save() {
        const db = await this.constructor.getDatabase();

        await db.transaction(async () => {
                const isNew = !this.uuid;
                const balance = new Balance();

                if (isNew) {
                    await balance.decrease(
                        this.price,
                        this.date,
                        'deduction'
                    );
                } else {
                    if (this.initData.price < this.price) {
                        await balance.decrease(
                            this.price - this.initData.price,
                            this.date,
                            'deduction'
                        );
                    } else {
                        await balance.increase(
                            this.initData.price - this.price,
                            this.date,
                            'refund'
                        );
                    }
                }

                await super.save();
        });
    }


    async delete() {
        const db = await this.constructor.getDatabase();

        await db.transaction(async () => {
            await super.delete();

            const balance = new Balance();
            await balance.increase(
                this.price,
                new Date(),
                'refund'
            );
        });
    }
}