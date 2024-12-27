import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useAdminAuth} from '../contexts/AdminAuth';
import { useNotification } from '../../contexts/NotificationContext';

const AdminSignIn = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const { addNotification } = useNotification();
    const { login } = useAdminAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.REACT_APP_API_ADMIN_URL}/signin`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                login(data.user);
                addNotification('You have successfully signed in');
                navigate('/admin/dashboard');
            } else {
                addNotification(data.message || 'Failed to sign in', 'error');
            }
        } catch (error) {
            addNotification('Error: Unable to connect to the server.', 'error');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96 space-y-4">
                <h1 className="text-2xl font-bold text-center">Admin Sign In</h1>
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
                    <label htmlFor="password" className="block text-gray-700">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded p-2"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
                >
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default AdminSignIn;