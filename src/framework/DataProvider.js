"use strict"

export default class DataProvider {
    constructor(config) {
        this.config = config;
    }

    async computePageParams(pageNum) {
        const pageSize = this.config.pagination.pageSize;
        const count = await this.config.model.getCount()
        const start = (pageNum - 1) * pageSize;
        const end = Math.min(start + pageSize, count);
        const totalPages = Math.ceil(count / pageSize);

        return {
            pageSize: pageSize,
            start: start,
            end: end,
            count: count,
            totalPages: totalPages,
        }
    }

    computeOrderBy() {
        const sort = this.config.sort;

        if (!sort.hasOwnProperty('orderBy')) {
            return sort.default.key + ' ' + sort.default.direction;
        }

        return sort.orderBy.key + ' ' + sort.orderBy.direction;
    }

    async getData(pageNum, ) {
        return await this.config.model.getPart(
            this.computeOrderBy(),
            await this.computePageParams(pageNum)
        );
    }
}