const BalanceMongoDB = require('./BalanceMongoDB');
const HistoryBalanceChange = require('./HistoryBalanceChange');

module.exports = class Balance extends BalanceMongoDB {
    constructor() {
        super();
    }
    async increase(value, date, type) {
        const result = await this.getValue() + parseInt(value);
        await this.save(result, value, date, type);
    }

    async decrease(value, date, type) {
        const result = await this.getValue() - parseInt(value);
        if (result < 0) {
            throw new Error("Not enough money on balance");
        }

        await this.save(result, value, date, type);
    }

    async save(result, value, date, type) {
        await super.save(result);

        const historyBalanceChange = await HistoryBalanceChange.create(
            new Date(date),
            type,
            value
        );
    }
}