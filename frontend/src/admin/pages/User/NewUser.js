import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import { useNotification } from '../../../contexts/NotificationContext';

const NewUser = () => {
    const navigate = useNavigate();
    const { addNotification } = useNotification();
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        role: 'user'
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: "include"
            });
            const data = await response.json();
            if (response.ok) {
                addNotification('A new user has been created successfully');
                navigate('/admin/users');
            } else {
                addNotification(data.message || 'Failed to create user', 'error');
            }
        } catch (e) {
            addNotification('Error: Unable to create user.' + e.message, 'error');
        }
    };
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Add New User</h1>
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
                <div>
                    <label htmlFor="role" className="block text-gray-700">Role:</label>
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded p-2"
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Add User
                </button>
            </form>
        </div>
    );
};

export default NewUser;