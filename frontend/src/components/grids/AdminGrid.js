import React, { useEffect, useState } from 'react';

const AdminGrid = ({ columns, fetchData, onEdit, onDelete }) => {
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState('');
    const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        const fetchGridData = async () => {
            setLoading(true);
            try {
                const { items, total } = await fetchData({ filters, sort, pagination });
                setData(items);
                setPagination((prev) => ({ ...prev, total }));
                setError('');
            } catch (err) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchGridData();
    }, [filters, sort, pagination.page]);

    const handleFilterChange = (name, value) => {
        setFilters((prev) => ({ ...prev, [name]: value }));
        setPagination((prev) => ({ ...prev, page: 1 }));
    };

    const handleSortChange = (field) => {
        setSort((prev) => (prev === field ? `-${field}` : field));
    };

    const handlePageChange = (newPage) => {
        setPagination((prev) => ({ ...prev, page: newPage }));
    };

    const handleDelete = async () => {
        if (onDelete && selectedItem) {
            await onDelete(selectedItem);
            setShowConfirm(false);
            setSelectedItem(null);
        }
    };

    return (
        <div>
            {error && <p className="text-red-500">{error}</p>}

            {/* Filters */}
            <div className="flex gap-4 mb-4">
                {columns
                    .filter((col) => col.filterable)
                    .map((col) => (
                        <div key={col.field}>
                            {col.options ? ( // If predefined options are available
                                <select
                                    value={filters[col.field] || ''}
                                    onChange={(e) => handleFilterChange(col.field, e.target.value)}
                                    className="border border-gray-300 rounded p-2"
                                >
                                    <option value="">{`Filter by ${col.label}`}</option>
                                    {col.options.map((option, index) => (
                                        <option key={index} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type="text"
                                    placeholder={`Search by ${col.label}`}
                                    value={filters[col.field] || ''}
                                    onChange={(e) => handleFilterChange(col.field, e.target.value)}
                                    className="border border-gray-300 rounded p-2"
                                />
                            )}
                        </div>
                    ))}
            </div>

            {/* Table */}
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                <tr>
                    {columns.map((col) => (
                        <th
                            key={col.field}
                            onClick={() => col.sortable && handleSortChange(col.field)}
                            className={`py-2 px-4 border-b ${col.sortable ? 'cursor-pointer' : ''}`}
                        >
                            {col.label}
                        </th>
                    ))}
                    <th className="py-2 px-4 border-b">Actions</th>
                </tr>
                </thead>
                <tbody>
                {loading ? (
                    <tr>
                        <td colSpan={columns.length + 1} className="text-center py-4">
                            Loading...
                        </td>
                    </tr>
                ) : data.length > 0 ? (
                    data.map((item, index) => (
                        <tr key={item._id} className="hover:bg-gray-100">
                            {columns.map((col) => (
                                <td key={col.field} className="py-2 px-4 border-b text-center">
                                    {col.render ? col.render(item[col.field], item) : item[col.field]}
                                </td>
                            ))}
                            <td className="py-2 px-4 border-b text-center">
                                <button
                                    className="text-blue-500 hover:underline"
                                    onClick={() => onEdit(item)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="text-red-500 hover:underline ml-2"
                                    onClick={() => {
                                        setSelectedItem(item);
                                        setShowConfirm(true);
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={columns.length + 1} className="text-center py-4">
                            No data found
                        </td>
                    </tr>
                )}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-center mt-4">
                {Array.from({ length: Math.ceil(pagination.total / pagination.limit) }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => handlePageChange(i + 1)}
                        className={`px-4 py-2 border ${pagination.page === i + 1 ? 'bg-blue-500 text-white' : ''}`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>

            {/* Confirm Delete */}
            {showConfirm && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded shadow-lg">
                        <p>Are you sure you want to delete this item?</p>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="text-gray-700 mr-4"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminGrid;