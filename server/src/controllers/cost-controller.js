const Cost = require('../models/Cost');
const Category = require("../models/Category");

const get = async (req, res) => {
    if (req.params.uuid) {
        return res.send(
                await Cost.getByUuidRaw(req.params.uuid)
        );
    }

    res.send(
            {
                items: await Cost.getPart(
                    req.params.sort,
                    parseInt(req.params.page),
                    parseInt(req.params.size)
                ),
                totalCount: await Cost.getCount()
            }
    );
}

const create = async (req, res) => {
    try {
        const cost = await Cost.create(
            new Date(req.body.date),
            await Category.getByUuid(req.body.category),
            parseInt(req.body.price),
            req.body.description
        );

        res.send(cost);
    } catch (err) {
        console.log(err);
        res.sendError(err);
    }
}

const update = async (req, res) => {
    try {
        const cost = await Cost.getByUuid(req.params.uuid);

        cost.date = new Date(req.body.date);
        cost.category = await Category.getByUuid(req.body.category);
        cost.price = parseInt(req.body.price);
        cost.description = req.body.description;

        cost.save();

        res.send(cost);
    } catch (err) {
        console.log(err);
        res.sendError(err);
    }

}

const del = async (req, res) => {
    const cost = await Cost.getByUuid(req.params.uuid);

    await cost.delete();

    res.send(cost);
}

module.exports = {
    get,
    create,
    update,
    del
}