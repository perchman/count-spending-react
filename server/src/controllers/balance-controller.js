const Balance = require('../models/balance/Balance');
const HistoryBalanceChange = require('../models/balance/HistoryBalanceChange');

const getValue = async (req, res) => {
    const balance = new Balance();
    res.send(await balance.getValue());
}

const replenish = async (req, res) => {
    const balance = new Balance();

    await balance.increase(
        parseInt(req.body.replenish),
        new Date(req.body.date),
        'replenishment'
    );

    res.send(await balance.getValue());
}

const getHistory = async (req, res) => {
    res.send(
        {
            items: await HistoryBalanceChange.getPart(
                req.params.sort,
                parseInt(req.params.page),
                parseInt(req.params.size)
            ),
            totalCount: await HistoryBalanceChange.getCount()
        }
    );
}

module.exports = {
    getValue,
    replenish,
    getHistory
}