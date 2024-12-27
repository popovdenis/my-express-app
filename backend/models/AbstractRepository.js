class AbstractRepository {
    constructor(resource) {
        if (!resource) {
            throw new Error('Resource must be provided');
        }
        this.resource = resource;
    }

    /**
     * Handle sort into Mongoose object
     * @param {string} sort
     * @returns {object} sortQuery
     */
    processSort(sort) {
        const sortQuery = {};
        if (sort) {
            const match = sort.match(/^(.*)_(asc|desc)$/);
            if (match) {
                const [, field, direction] = match;
                sortQuery[field] = direction === 'asc' ? 1 : -1;
            }
        }
        return sortQuery;
    }

    /**
     * Handle filters. Will be rewritten in children
     */
    processFilters(filters) {
        return filters;
    }

    /**
     * Gets list with filters, sort and pagination.
     *
     * @param {object} filters
     * @param {string} sort
     * @param {number} skip
     * @param {number} limit
     * @param {string|object|null} populate
     * @returns {object} { items, total }
     */
    async getList(filters, sort, skip, limit, populate = null) {
        const query = this.processFilters(filters);
        const sortQuery = this.processSort(sort);

        let queryChain = this.resource.find(query).sort(sortQuery).skip(skip).limit(limit);

        if (populate) {
            queryChain = queryChain.populate(populate);
        }

        const items = await queryChain.exec();
        const total = await this.resource.countDocuments(query);

        return { items, total };
    }
}

module.exports = AbstractRepository;