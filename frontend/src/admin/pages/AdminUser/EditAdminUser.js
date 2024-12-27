import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import { useNotification } from '../../../contexts/NotificationContext';
import { adminApiClient } from '../../../api/AdminApiClient';

const EditAdminUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addNotification } = useNotification();
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        role:  'admin'
    });
    const [loading, setLoading] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await adminApiClient.get(`/users/${id}`);
                setFormData({
                    firstname: data.user.firstname,
                    lastname: data.user.lastname,
                    email: data.user.email,
                    role: data.user.role
                });
            } catch (error) {
                addNotification(error.message || 'Failed to fetch user data', 'error');
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await adminApiClient.put(`/users/${id}`, { body: formData });
            addNotification(`The user has been updated successfully`, 'success');
            navigate('/admin/users');
        } catch (e) {
            addNotification(`Error: Unable to create user: ${e.message}`, 'error');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="p6">
            <h1 className="text-2xl font-bold mb-4">Edit User</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="firstname" className="block text-gray-700">First Name:</label>
                    <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded p-2"
                    />
                </div>
                <div>
                    <label htmlFor="lastname" className="block text-gray-700">Last Name:</label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded p-2"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-gray-700">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded p-2"
                    />
                </div>
                <div>
                    <label htmlFor="role" className="block text-gray-700">Role:</label>
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded p-2"
                    >
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div className="mt-4 flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/users')}
                        className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditAdminUser;