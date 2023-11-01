const MongoClient = require('mongodb').MongoClient;
module.exports = class MongoDB {
    constructor(name) {
        this.name = name;
        this.client = new MongoClient('mongodb://127.0.0.1:27017/');
    }

    async connect() {
        try {
            await this.client.connect();
            console.log(`Connection to ${this.name} installed`);
            this.db = this.client.db(this.name);
        } catch(err) {
            console.log(err);
        }
    }

    async transaction(callback) {
        const session = this.client.startSession();
        try {
            await session.withTransaction(async () => await callback());
        } catch (err) {
            if (session.inTransaction()) {
                await session.abortTransaction();
            }
            throw new Error(err.message);
        } finally {
            session.endSession();
        }
    }
}