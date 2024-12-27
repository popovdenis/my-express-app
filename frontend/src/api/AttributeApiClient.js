import { adminApiClient } from './AdminApiClient';

const AttributeApiClient = {
    fetchItems: async (query = {}, params = {}) => {
        const endpoint =
            query instanceof URLSearchParams
                ? `/attributes?${query.toString()}`
                : `/attributes`;

        return await adminApiClient.get(endpoint, { params });
    },
    getAttributeById: async (id) => {
        return await adminApiClient.get(`/customers/${id}`);
    },
    createAttribute: async (data) => {
        return await adminApiClient.post('/customers', data);
    },
    updateAttribute: async (id, data) => {
        return await adminApiClient.put(`/customers/${id}`, data);
    },
    deleteAttribute: async (id) => {
        return await adminApiClient.delete(`/customers/${id}`);
    },
};

export default AttributeApiClient;