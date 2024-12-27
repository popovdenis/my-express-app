import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useNotification } from '../../../../contexts/NotificationContext';
import AdminGrid from '../../../../components/grids/AdminGrid';
import AttributeApiClient from "../../../../api/AttributeApiClient";

const Attributes = () => {
    const navigate = useNavigate();
    const { addNotification } = useNotification();

    const fetchAttributes = async ({ filters, sort, pagination }) => {
        const query = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
            if (value) query.append(`filter[${key}]`, value);
        });

        if (sort) query.append('sort', sort);

        const params = {
            page: pagination.page,
            limit: pagination.limit,
        };

        const data = await AttributeApiClient.fetchItems(query, params);

        return { items: data.attributes, total: data.total };
    };

    const handleEdit = (customer) => {
        navigate(`/admin/attributes/${customer._id}`);
    };

    const handleDelete = async (customer) => {
        try {
            await AttributeApiClient.deleteAttribute(customer._id);
            addNotification('The attribute has been deleted successfully', 'success');
            return true;
        } catch (err) {
            addNotification('Failed to delete the attribute', 'error');
            return false;
        }
    };

    const columns = [
        { label: 'ID', field: '_id' },
        { label: 'Attribute Label', field: 'label', sortable: true },
        { label: 'Attribute Code', field: 'attribute_code', filterable: true, sortable: true },
        {
            label: 'Entity Type',
            field: 'entity_type',
            sortable: true,
            render: (value, row) => row.entity_type?.entity_type_code || 'N/A',
        },
        {
            label: 'Required',
            field: 'is_required',
            sortable: true,
            render: (value, row) => row.is_required ? 'Yes' : 'No',
        },
        {
            label: 'Created At',
            field: 'createdAt',
            render: (value) => new Date(value).toLocaleString(),
        },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold mb-4">Attributes</h1>
                <Link to="/admin/attributes/new" className="btn btn-primary">
                    Add New Attribute
                </Link>
            </div>
            <AdminGrid
                columns={columns}
                fetchData={fetchAttributes}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default Attributes;