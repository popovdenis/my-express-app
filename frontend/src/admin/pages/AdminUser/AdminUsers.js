import React from 'react';
import { Link, useNavigate}  from 'react-router-dom';
import { useNotification } from '../../../contexts/NotificationContext';
import AdminGrid from '../../../components/grids/AdminGrid';
import AdminUserApiClient from "../../../api/AdminUserApiClient";

const AdminUsers = () => {
    const navigate = useNavigate();
    const { addNotification } = useNotification();

    const fetchAdminUsers = async ({ filters, sort, pagination }) => {
        const query = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
            if (value) query.append(`filter[${key}]`, value);
        });

        if (sort) query.append('sort', sort);

        const params = {
            page: pagination.page,
            limit: pagination.limit,
        };

        const data = await AdminUserApiClient.fetchUsers(query, params);

        return { items: data.users, total: data.total };
    };

    const handleEdit = (user) => {
        navigate(`/admin/users/${user._id}`);
    };

    const handleDelete = async (user) => {
        try {
            await AdminUserApiClient.deleteUser(user._id);
            addNotification('The user has been deleted successfully', 'success');
            return true;
        } catch (err) {
            addNotification('Failed to delete the user', 'error');
            return false;
        }
    };

    const columns = [
        { label: 'ID', field: '_id' },
        { label: 'First Name', field: 'firstname', filterable: true, sortable: true },
        { label: 'Last Name', field: 'lastname', sortable: true },
        { label: 'Email', field: 'email', sortable: true },
        { label: 'Role', field: 'role', sortable: true },
        {
            label: 'Created At',
            field: 'createdAt',
            render: (value) => new Date(value).toLocaleString(),
        },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold mb-4">Users</h1>
                <Link to="/admin/users/new" className="btn btn-primary">
                    Add New User
                </Link>
            </div>
            <AdminGrid
                columns={columns}
                fetchData={fetchAdminUsers}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default AdminUsers;