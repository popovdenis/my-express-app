import { adminApiClient } from './AdminApiClient';

const AdminUserApiClient = {
    fetchUsers: async (query = {}, params = {}) => {
        const endpoint =
            query instanceof URLSearchParams
                ? `/users?${query.toString()}`
                : `/users`;

        return await adminApiClient.get(endpoint, { params });
    },
    getUserById: async (id) => {
        return await adminApiClient.get(`/users/${id}`);
    },
    createUser: async (data) => {
        return await adminApiClient.post('/users', data);
    },
    updateUser: async (id, data) => {
        return await adminApiClient.put(`/users/${id}`, data);
    },
    deleteUser: async (id) => {
        return await adminApiClient.delete(`/users/${id}`);
    },
};

export default AdminUserApiClient;