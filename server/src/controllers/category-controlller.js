const Category = require('../models/Category');

const get = async (req, res) => {
    if (req.params.uuid) {
        return res.send(
                await Category.getByUuidRaw(req.params.uuid)
        );
    }

    if (req.params.sort && req.params.page && req.params.size) {
        return res.send(
                {
                    items: await Category.getPart(
                        req.params.sort,
                        parseInt(req.params.page),
                        parseInt(req.params.size)
                    ),
                    totalCount: await Category.getCount()
                }
        );
    }

    res.send(await Category.getAllSorted(req.params.sort));
}

const create = async (req, res) => {
    const category = await Category.create(req.body.name);

    res.send(category);
}

const update = async (req, res) => {
    const category = await Category.getByUuid(req.params.uuid);
    category.name = req.body.name;
    category.save();

    res.send(category);
}

const del = async (req, res) => {
    try {
        const category = await Category.getByUuid(req.params.uuid);
        await category.delete();

        res.send(category);
    } catch (err) {
        res.sendError(err);
    }
}

module.exports = {
    get,
    create,
    update,
    del
}