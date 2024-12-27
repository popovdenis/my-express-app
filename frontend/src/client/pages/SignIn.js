import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/Auth';
import { customerApiClient } from '../../api/CustomerApiClient';
import { useNotification } from '../../contexts/NotificationContext';

const SignIn = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const { addNotification } = useNotification();
    const { login } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await customerApiClient.post('/auth/signin', { body: formData });
            login(response.user);
            navigate('/');
        } catch (error) {
            addNotification(error.message || 'Error: Unable to connect to the server', 'error');
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Sign In</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-gray-700">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded p-2"
                        required
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
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default SignIn;