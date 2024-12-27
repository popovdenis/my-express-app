import React from 'react';
import AdminGrid from '../../../components/grids/AdminGrid';
import AdminCourseApiClient from '../../../api/AdminCourseApiClient';
import { adminApiClient } from '../../../api/AdminApiClient';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../../contexts/NotificationContext';

const CoursesGrid = () => {
    const navigate = useNavigate();
    const { addNotification } = useNotification();

    const columns = [
        { label: 'ID', field: '_id' },
        { label: 'Title', field: 'title', filterable: true, sortable: true },
        { label: 'Duration', field: 'duration', filterable: true, options: ['1h', '2h', '3h'] },
        { label: 'Level', field: 'level', sortable: true },
        { label: 'Created At', field: 'createdAt', render: (value) => new Date(value).toLocaleString() },
    ];

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

    return (
        <AdminGrid
            columns={columns}
            dataProvider={AdminCourseApiClient.fetchCourses}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
    );
};

export default CoursesGrid;