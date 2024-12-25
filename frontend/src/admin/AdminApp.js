import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {ProtectedAdminRoute} from './components/ProtectedAdminRoute';
// General
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import AdminSignIn from './pages/AdminSignIn';
// Users
import Users from './pages/User/Users';
import NewUser from './pages/User/NewUser';
import EditUser from './pages/User/EditUser';
// Courses
import Courses from './pages/Course/Courses';
import NewCourse from './pages/Course/NewCourse';
import EditCourse from './pages/Course/EditCourse';
// System
import Attributes from './pages/System/Attributes';

const AdminApp = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="ml-64 p-4 w-full">
                <Routes>
                    <Route path="/signin" element={<AdminSignIn />} />
                    <Route path="/dashboard" element={
                        <ProtectedAdminRoute>
                            <Dashboard />
                        </ProtectedAdminRoute>
                    } />
                    <Route path="/users" element={
                        <ProtectedAdminRoute>
                            <Users />
                        </ProtectedAdminRoute>
                    } />
                    <Route path="/users/new" element={
                        <ProtectedAdminRoute>
                            <NewUser />
                        </ProtectedAdminRoute>
                    } />
                    <Route path="/users/:id" element={
                        <ProtectedAdminRoute>
                            <EditUser />
                        </ProtectedAdminRoute>
                    } />
                    <Route path="/courses" element={
                        <ProtectedAdminRoute>
                            <Courses />
                        </ProtectedAdminRoute>
                    } />
                    <Route path="/courses/new" element={
                        <ProtectedAdminRoute>
                            <NewCourse />
                        </ProtectedAdminRoute>
                    } />
                    <Route path="/courses/:id" element={
                        <ProtectedAdminRoute>
                            <EditCourse />
                        </ProtectedAdminRoute>
                    } />
                    <Route path="/settings" element={
                        <ProtectedAdminRoute>
                            <Settings />
                        </ProtectedAdminRoute>
                    } />
                    <Route path="/attributes" element={
                        <ProtectedAdminRoute>
                            <Attributes />
                        </ProtectedAdminRoute>
                    } />
                </Routes>
            </div>
        </div>
    );
};

export default AdminApp;