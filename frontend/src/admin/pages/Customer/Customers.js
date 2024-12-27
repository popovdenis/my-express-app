import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import DropdownActions from '../../components/DropdownActions';
import ConfirmDelete from '../../../components/ConfirmDelete';
import { useNotification } from '../../../contexts/NotificationContext';
import { adminApiClient } from '../../../api/AdminApiClient';

const Customers = () => {
    const [customers, setCustomer] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const navigate = useNavigate();
    const { addNotification } = useNotification();

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const data = await adminApiClient.get(`/customers`);
                setCustomer(data.customers);
            } catch (err) {
                navigate('/signin');
            } finally {
                setLoading(false);
            }
        };
        fetchCustomer();
    }, []);
    const handleDelete = async () => {
        if (!selectedCustomer) {
            return;
        }
        try {
            await adminApiClient.delete(`/customers/${selectedCustomer._id}`);
            setCustomer((prevCustomer) => prevCustomer.filter(customer => customer._id !== selectedCustomer._id));
            setShowConfirm(false);
            setSelectedCustomer(null);
            addNotification('The customer has been deleted successfully');
        } catch (err) {
            addNotification('Error: Unable to delete customer.' + e.message, 'error');
        }
    };

    if (loading) {
        return <p>Loading customers...</p>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold mb-4">Customers</h1>
                <Link to="/admin/customers/new"
                      className="bg-red-500 text-white py-2 px-4 rounded font-bold hover:bg-red-700">
                    Add New Customer
                </Link>
            </div>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                <tr>
                    <th className="py-2 px-4 border-b">#</th>
                    <th className="py-2 px-4 border-b">First Name</th>
                    <th className="py-2 px-4 border-b">Last Name</th>
                    <th className="py-2 px-4 border-b">Email</th>
                    <th className="py-2 px-4 border-b">Role</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                </tr>
                </thead>
                <tbody>
                {customers.map((customer, index) => (
                    <tr key={customer._id} className="hover:bg-gray-100">
                        <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                        <td className="py-2 px-4 border-b">{customer.firstname}</td>
                        <td className="py-2 px-4 border-b">{customer.lastname}</td>
                        <td className="py-2 px-4 border-b">{customer.email}</td>
                        <td className="py-2 px-4 border-b text-center">{customer.role}</td>
                        <td className="py-2 px-4 border-b text-center relative">
                            <DropdownActions
                                onEdit={() => navigate(`/admin/customers/${customer._id}`)}
                                onDelete={() => {
                                    setSelectedCustomer(customer);
                                    setShowConfirm(true);
                                }}
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {showConfirm && (
                <ConfirmDelete
                    entityId={selectedCustomer._id}
                    onClose={() => setShowConfirm(false)}
                    onConfirm={handleDelete}
                />
            )}
        </div>
    );
};

export default Customers;