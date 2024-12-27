import { adminApiClient } from './AdminApiClient';

const AdminCourseApiClient = {
    fetchItems: async (query = {}, params = {}) => {
        const endpoint =
            query instanceof URLSearchParams
                ? `/courses?${query.toString()}`
                : `/courses`;

        return await adminApiClient.get(endpoint, { params });
    },
    getCourseById: async (id) => {
        return await adminApiClient.get(`/courses/${id}`);
    },
    createCourse: async (data) => {
        return await adminApiClient.post('/courses', data);
    },
    updateCourse: async (id, data) => {
        return await adminApiClient.put(`/courses/${id}`, data);
    },
    deleteCourse: async (id) => {
        return await adminApiClient.delete(`/courses/${id}`);
    },
};

export default AdminCourseApiClient;