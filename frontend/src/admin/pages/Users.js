import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/users`, {
                    method: 'GET',
                    credentials: 'include'
                });

                if (response.ok) {
                    const data = await response.json();
                    setUsers(data.users);
                    setError('');
                } else {
                    const errData = await response.json();
                    setError(errData.message || 'Failed to fetch users');
                }
            } catch (err) {
                navigate('/signin');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <p>Loading users...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold mb-4">Users</h1>
                <Link to="/admin/users/new"
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    New User
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
                </tr>
                </thead>
                <tbody>
                {users.map((user, index) => (
                    <tr key={user._id} className="hover:bg-gray-100">
                        <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                        <td className="py-2 px-4 border-b">{user.firstname}</td>
                        <td className="py-2 px-4 border-b">{user.lastname}</td>
                        <td className="py-2 px-4 border-b">{user.email}</td>
                        <td className="py-2 px-4 border-b text-center">{user.role}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;