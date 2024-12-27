import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useNotification } from '../../../contexts/NotificationContext';
import AdminGrid from '../../../components/grids/AdminGrid';
import CourseApiClient from "../../../api/CourseApiClient";

const Courses = () => {
    const navigate = useNavigate();
    const { addNotification } = useNotification();

    const fetchCourses = async ({ filters, sort, pagination }) => {
        const query = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
            if (value) query.append(`filter[${key}]`, value);
        });

        if (sort) query.append('sort', sort);

        const params = {
            page: pagination.page,
            limit: pagination.limit,
        };

        const data = await CourseApiClient.fetchCourses(query, params);

        return { items: data.courses, total: data.total };
    };

    const handleEdit = (course) => {
        navigate(`/admin/courses/${course._id}`);
    };

    const handleDelete = async (course) => {
        try {
            await CourseApiClient.deleteCourse(course._id);
            addNotification('Course deleted successfully', 'success');
            return true;
        } catch (err) {
            addNotification('Failed to delete course', 'error');
            return false;
        }
    };

    const columns = [
        { label: 'ID', field: '_id' },
        { label: 'Title', field: 'title', filterable: true, sortable: true },
        { label: 'Duration', field: 'duration', filterable: true, options: ['1h', '2h', '3h'] },
        { label: 'Level', field: 'level', sortable: true },
        {
            label: 'Created At',
            field: 'createdAt',
            render: (value) => new Date(value).toLocaleString(),
        },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold mb-4">Courses</h1>
                <Link
                    to="/admin/courses/new"
                    className="btn btn-primary"
                >
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