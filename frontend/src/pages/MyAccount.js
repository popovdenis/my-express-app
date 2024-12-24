import React, { useState } from 'react';
import { useAuth } from '../contexts/auth';

const MyAccount = () => {
    const { user, login } = useAuth();
    const [formData, setFormData] = useState({
        firstname: user?.firstname || '',
        lastname: user?.lastname || '',
        email: user?.email || '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(process.env.REACT_APP_API_URL + '/customer/account', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                credentials: "include",
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                login(data.user);
                setMessage('Profile updated successfully');
                setError('');
            } else {
                setError(data.message || 'Failed to update profile');
                setMessage('');
            }
        } catch (error) {
            setError('Error: Unable to connect to the server.');
            setMessage('');
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">My Account</h1>
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
                    <label htmlFor="password" className="block text-gray-700">Password (optional):</label>
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
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Save Changes
                </button>
            </form>
            {message && <p className="mt-4 text-green-500">{message}</p>} {/* Display success message */}
            {error && <p className="mt-4 text-red-500">{error}</p>} {/* Display error message */}
        </div>
    );
};

export default MyAccount;