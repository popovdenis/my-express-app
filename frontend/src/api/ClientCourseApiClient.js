import { customerApiClient } from './CustomerApiClient';

const ClientCourseApiClient = {
    fetchItems: async (query = {}, params = {}) => {
        const endpoint =
            query instanceof URLSearchParams
                ? `/courses?${query.toString()}`
                : `/courses`;

        return await customerApiClient.get(endpoint, { params });
    },
    getCourseById: async (id) => {
        return await customerApiClient.get(`/courses/${id}`);
    },
};

export default ClientCourseApiClient;