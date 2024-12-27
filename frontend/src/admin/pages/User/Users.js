import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import DropdownActions from '../../components/DropdownActions';
import ConfirmDelete from '../../components/ConfirmDelete';
import { useNotification } from '../../../contexts/NotificationContext';
import { adminApiClient } from '../../../api/AdminApiClient';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const navigate = useNavigate();
    const { addNotification } = useNotification();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await adminApiClient.get(`/users`);
                setUsers(data.users);
            } catch (err) {
                navigate('/signin');
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);
    const handleDelete = async () => {
        if (!selectedUser) {
            return;
        }
        try {
            await adminApiClient.delete(`/users/${selectedUser._id}`);
            setUsers((prevUsers) => prevUsers.filter(user => user._id !== selectedUser._id));
            setShowConfirm(false);
            setSelectedUser(null);
            addNotification('The user has been deleted successfully');
        } catch (err) {
            addNotification('Error: Unable to delete user.' + e.message, 'error');
        }
    };

    if (loading) {
        return <p>Loading users...</p>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold mb-4">Users</h1>
                <Link to="/admin/users/new"
                      className="bg-red-500 text-white py-2 px-4 rounded font-bold hover:bg-red-700">
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
                    <th className="py-2 px-4 border-b">Actions</th>
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
                        <td className="py-2 px-4 border-b text-center relative">
                            <DropdownActions
                                onEdit={() => navigate(`/admin/users/${user._id}`)}
                                onDelete={() => {
                                    setSelectedUser(user);
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
                    entityId={selectedUser._id}
                    onClose={() => setShowConfirm(false)}
                    onConfirm={handleDelete}
                />
            )}
        </div>
    );
};

export default Users;