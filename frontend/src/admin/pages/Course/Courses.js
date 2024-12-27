import React from 'react';
import AdminGrid from '../../../components/grids/AdminGrid';
import { adminApiClient } from '../../../api/AdminApiClient';
import { Link, useNavigate } from 'react-router-dom';
import { useNotification } from '../../../contexts/NotificationContext';

const Courses = () => {
    const navigate = useNavigate();
    const { addNotification } = useNotification();

    const fetchCourses = async ({ filters, sort, pagination }) => {
        const query = new URLSearchParams();

        if (filters.title) query.append('filter[title]', filters.title);
        if (filters.level) query.append('filter[level]', filters.level);
        if (sort) query.append('sort', sort);
        query.append('page', pagination.page);
        query.append('limit', pagination.limit);

        const data = await adminApiClient.get(`/courses?${query.toString()}`);
        return { items: data.courses, total: data.total };
    };

    const handleEdit = (course) => {
        navigate(`/admin/courses/${course._id}`);
    };

    const handleDelete = async (course) => {
        try {
            await adminApiClient.delete(`/courses/${course._id}`);
            addNotification('Course deleted successfully', 'success');
        } catch (err) {
            addNotification('Failed to delete course', 'error');
        }
    };

    const columns = [
        { label: 'ID', field: '_id' },
        { label: 'Title', field: 'title', filterable: true, sortable: true },
        { label: 'Duration', field: 'duration', filterable: true, options: ['1h', '2h', '3h'] },
        { label: 'Level', field: 'level', sortable: true },
        { label: 'Created At', field: 'createdAt', render: (value) => new Date(value).toLocaleString() },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold mb-4">Courses</h1>
            </div>
            <div className="flex justify-end items-center mb-4">
                <Link to="/admin/courses/new"
                      className="bg-red-500 text-white py-2 px-4 rounded font-bold hover:bg-red-700">
                    New Course
                </Link>
            </div>
            <AdminGrid
                columns={columns}
                fetchData={fetchCourses}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default Courses;