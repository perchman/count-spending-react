const MongoDBActiveRecordModel = require('../../MongoDBActiveRecordModel');

module.exports = class HistoryBalanceChange extends MongoDBActiveRecordModel {
    constructor(uuid, date, type, amount) {
        super(uuid);
        this.date = date;
        this.type = type;
        this.amount = amount;

        this.validate();
    }

    static getEntityName() {
        return 'historyBalanceChange';
    }

    static getDatabaseName() {
        return 'Default';
    }

    validate() {
        if (typeof this.date !== "object") {
            throw new Error("Invalid data type for date. Type must be a object");
        }
        if (!this.date instanceof Date) {
            throw new Error("Invalid data type for date. Object must be an instance of the Date object");
        }
    }

    static async create(date, type, amount) {
        const historyBalanceChange = new HistoryBalanceChange(
            null,
            date,
            type,
            amount
        )

        await historyBalanceChange.save();

        return historyBalanceChange;
    }

    static makeModel(data) {
        return new HistoryBalanceChange(
            data.uuid,
            new Date(data.date),
            data.type,
            data.amount
        );
    }
    toJSON() {
        let obj = {
            uuid: this.uuid,
            date: new Date(this.date).getTime(),
            type: this.type,
            amount: this.amount
        };

        if (!this.uuid) {
            delete obj.uuid;
        }

        return obj;
    }
}