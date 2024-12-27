import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../../contexts/NotificationContext';
import AdminGrid from '../../../components/grids/AdminGrid';
import AdminEnrollmentApiClient from "../../../api/AdminEnrollmentApiClient";

const Enrollments = () => {
    const navigate = useNavigate();
    const { addNotification } = useNotification();

    const fetchEnrollments = async ({ filters, sort, pagination }) => {
        const query = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
            if (value) query.append(`filter[${key}]`, value);
        });

        if (sort) query.append('sort', sort);

        const params = {
            page: pagination.page,
            limit: pagination.limit,
        };

        const data = await AdminEnrollmentApiClient.fetchItems(query, params);

        return { items: data.enrollments, total: data.total };
    };

    const handleEdit = (entity) => {
        navigate(`/admin/enrollments/${entity._id}`);
    };

    const handleDelete = async (entity) => {
        try {
            await AdminEnrollmentApiClient.deleteEnrollment(entity._id);
            addNotification('Entity deleted successfully', 'success');
            return true;
        } catch (err) {
            addNotification('Failed to delete entity', 'error');
            return false;
        }
    };

    const columns = [
        { label: 'ID', field: '_id' },
        { label: 'Course', field: 'course', sortable: true },
        { label: 'Customer', field: 'customer', sortable: true },
        { label: 'Status', field: 'status', sortable: true },
        {
            label: 'Created At',
            field: 'createdAt',
            render: (value) => new Date(value).toLocaleString(),
        },
        {
            label: 'Completed At',
            field: 'completedAt',
            render: (value) => new Date(value).toLocaleString(),
        },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold mb-4">Enrollments</h1>
            </div>
            <AdminGrid
                columns={columns}
                fetchData={fetchEnrollments}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default Enrollments;