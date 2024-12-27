import React from 'react';
import { Routes, Route } from 'react-router-dom';
// General
import Sidebar from '../components/Sidebar';
import Dashboard from '../pages/Dashboard';
import Settings from '../pages/Settings';
// Customer Entities
import Customers from '../pages/Customer/Customers';
import NewCustomer from '../pages/Customer/NewCustomer';
import EditCustomer from '../pages/Customer/EditCustomer';
// Users
import AdminUsers from '../pages/AdminUser/AdminUsers';
import NewAdminUser from '../pages/AdminUser/NewAdminUser';
import EditAdminUser from '../pages/AdminUser/EditAdminUser';
// Courses
import Courses from '../pages/Course/Courses';
import NewCourse from '../pages/Course/NewCourse';
import EditCourse from '../pages/Course/EditCourse';
// Enrollments
import Enrollments from '../pages/Enrollments/Enrollments';
// System
import Attributes from '../pages/System/Attribute/Attributes';
import NewAttribute from '../pages/System/Attribute/NewAttribute';
import EditAttribute from '../pages/System/Attribute/EditAttribute';

const BaseAdminRoutes = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="ml-64 p-4 w-full">
                <Routes>
                    {/* General */}
                    <Route path="/dashboard" element={ <Dashboard /> } />
                    {/* Customer Entities */}
                    <Route path="/customers" element={ <Customers /> } />
                    <Route path="/customers/new" element={ <NewCustomer /> } />
                    <Route path="/customers/:id" element={ <EditCustomer /> } />
                    {/* Courses */}
                    <Route path="/courses" element={ <Courses /> } />
                    <Route path="/courses/new" element={ <NewCourse /> } />
                    <Route path="/courses/:id" element={ <EditCourse /> } />
                    {/* Admin Users */}
                    <Route path="/users" element={ <AdminUsers /> } />
                    <Route path="/users/new" element={ <NewAdminUser /> } />
                    <Route path="/users/:id" element={ <EditAdminUser /> } />
                    {/* Settings */}
                    <Route path="/settings" element={ <Settings /> } />
                    {/* Attributes */}
                    <Route path="/attributes" element={ <Attributes /> } />
                    <Route path="/attributes/new" element={ <NewAttribute /> } />
                    <Route path="/attributes/:id" element={ <EditAttribute /> } />
                    {/* Enrollments */}
                    <Route path="/enrollments" element={ <Enrollments /> } />
                </Routes>
            </div>
        </div>
    );
};

export default BaseAdminRoutes;