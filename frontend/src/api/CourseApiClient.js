import { adminApiClient } from './AdminApiClient';

const CourseApiClient = {
    fetchCourses: async (params) => {
        return await adminApiClient.get('/admin/courses', { params });
    },
    getCourseById: async (id) => {
        return await adminApiClient.get(`/admin/courses/${id}`);
    },
    createCourse: async (data) => {
        return await adminApiClient.post('/admin/courses', data);
    },
    updateCourse: async (id, data) => {
        return await adminApiClient.put(`/admin/courses/${id}`, data);
    },
    deleteCourse: async (id) => {
        return await adminApiClient.delete(`/admin/courses/${id}`);
    },
};

export default CourseApiClient;