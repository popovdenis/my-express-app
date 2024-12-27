import React from 'react';
import AdminGrid from '../../../components/grids/AdminGrid';
import CourseApiClient from '../../../api/CourseApiClient';
import { useNavigate } from 'react-router-dom';

const CoursesGrid = () => {
    const navigate = useNavigate();

    const columns = [
        { label: 'ID', field: '_id' },
        { label: 'Title', field: 'title', sortable: true, filterable: true },
        { label: 'Duration', field: 'duration' },
        { label: 'Level', field: 'level', sortable: true },
    ];

    const handleEdit = (course) => {
        navigate(`/admin/courses/${course._id}`);
    };

    const handleDelete = async (course) => {
        await CourseApiClient.deleteCourse(course._id);
    };

    return (
        <AdminGrid
            columns={columns}
            dataProvider={CourseApiClient.fetchCourses}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
    );
};

export default CoursesGrid;