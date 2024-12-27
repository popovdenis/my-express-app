import { adminApiClient } from './AdminApiClient';

const AdminEnrollmentApiClient = {
    fetchItems: async (query = {}, params = {}) => {
        const endpoint =
            query instanceof URLSearchParams
                ? `/enrollments?${query.toString()}`
                : `/enrollments`;

        return await adminApiClient.get(endpoint, { params });
    },
    getEnrollmentById: async (id) => {
        return await adminApiClient.get(`/enrollments/${id}`);
    },
    createEnrollment: async (data) => {
        return await adminApiClient.post('/enrollments', data);
    },
    updateEnrollment: async (id, data) => {
        return await adminApiClient.put(`/enrollments/${id}`, data);
    },
    deleteEnrollment: async (id) => {
        return await adminApiClient.delete(`/enrollments/${id}`);
    },
};

export default AdminEnrollmentApiClient;