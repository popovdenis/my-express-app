import React from 'react';
import { Link, useNavigate}  from 'react-router-dom';
import { useNotification } from '../../../contexts/NotificationContext';
import AdminGrid from '../../../components/grids/AdminGrid';
import CustomerEntityApiClient from "../../../api/CustomerEntityApiClient";

const Customers = () => {
    const navigate = useNavigate();
    const { addNotification } = useNotification();

    const fetchCustomers = async ({ filters, sort, pagination }) => {
        const query = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
            if (value) query.append(`filter[${key}]`, value);
        });

        if (sort) query.append('sort', sort);

        const params = {
            page: pagination.page,
            limit: pagination.limit,
        };

        const data = await CustomerEntityApiClient.fetchCustomers(query, params);

        return { items: data.customers, total: data.total };
    };

    const handleEdit = (customer) => {
        navigate(`/admin/customers/${customer._id}`);
    };

    const handleDelete = async (customer) => {
        try {
            await CustomerEntityApiClient.deleteCustomer(customer._id);
            addNotification('The customer has been deleted successfully', 'success');
            return true;
        } catch (err) {
            addNotification('Failed to delete the customer', 'error');
            return false;
        }
    };

    const columns = [
        { label: 'ID', field: '_id' },
        { label: 'First Name', field: 'firstname', filterable: true, sortable: true },
        { label: 'Last Name', field: 'lastname', sortable: true },
        { label: 'Email', field: 'email', sortable: true },
        {
            label: 'Created At',
            field: 'createdAt',
            render: (value) => new Date(value).toLocaleString(),
        },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold mb-4">Customers</h1>
                <Link to="/admin/customers/new" className="btn btn-primary">
                    Add New Customer
                </Link>
            </div>
            <AdminGrid
                columns={columns}
                fetchData={fetchCustomers}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default Customers;