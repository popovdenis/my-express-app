import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Courses from './pages/Courses';
import Settings from './pages/Settings';
import NewUser from './pages/NewUser';
import EditUser from './pages/EditUser';
import AdminSignIn from './pages/AdminSignIn';
import {ProtectedAdminRoute} from '../components/ProtectedRoute';

const AdminApp = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="ml-64 p-4 w-full">
                <Routes>
                    <Route path="/signin" element={<AdminSignIn />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedAdminRoute>
                                <Dashboard />
                            </ProtectedAdminRoute>
                        }
                    />
                    <Route
                        path="/users"
                        element={
                            <ProtectedAdminRoute>
                                <Users />
                            </ProtectedAdminRoute>
                        }
                    />
                    <Route
                        path="/users/new"
                        element={
                            <ProtectedAdminRoute>
                                <NewUser />
                            </ProtectedAdminRoute>
                        }
                    />
                    <Route
                        path="/users/:id"
                        element={
                            <ProtectedAdminRoute>
                                <EditUser />
                            </ProtectedAdminRoute>
                        }
                    />
                    <Route
                        path="/courses"
                        element={
                            <ProtectedAdminRoute>
                                <Courses />
                            </ProtectedAdminRoute>
                        }
                    />
                    <Route
                        path="/settings"
                        element={
                            <ProtectedAdminRoute>
                                <Settings />
                            </ProtectedAdminRoute>
                        }
                    />
                </Routes>
            </div>
        </div>
    );
};

export default AdminApp;