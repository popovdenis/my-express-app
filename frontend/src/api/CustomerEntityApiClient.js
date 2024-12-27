import { adminApiClient } from './AdminApiClient';

const CustomerEntityApiClient = {
    fetchCustomers: async (query = {}, params = {}) => {
        const endpoint =
            query instanceof URLSearchParams
                ? `/customers?${query.toString()}`
                : `/customers`;

        return await adminApiClient.get(endpoint, { params });
    },
    getCustomerById: async (id) => {
        return await adminApiClient.get(`/customers/${id}`);
    },
    createCustomer: async (data) => {
        return await adminApiClient.post('/customers', data);
    },
    updateCustomer: async (id, data) => {
        return await adminApiClient.put(`/customers/${id}`, data);
    },
    deleteCustomer: async (id) => {
        return await adminApiClient.delete(`/customers/${id}`);
    },
};

export default CustomerEntityApiClient;