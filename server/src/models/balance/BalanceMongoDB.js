const ServiceLocator = require('../../ServiceLocator');

module.exports = class BalanceMongoDB {
    static getDatabaseName() {
        return 'Default';
    }

    async getValue() {
        const db = ServiceLocator.get(this.constructor.getDatabaseName()).db;
        const collection = db.collection('balance');
        const obj = await collection.findOne({ key: 'balance' });

        return obj ? parseInt(obj.value) : 0;
    }

    async save(value) {
        const db = ServiceLocator.get(this.constructor.getDatabaseName()).db;
        const collection = db.collection('balance');
        const result = await collection.findOneAndUpdate(
            { key: 'balance' },
            { $set: { ket: 'balance', value: value } },
            { upsert: true }
        );
    }
}