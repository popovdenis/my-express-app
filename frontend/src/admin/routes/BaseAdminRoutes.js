import React from 'react';
import { Routes, Route } from 'react-router-dom';
// General
import Sidebar from '../components/Sidebar';
import Dashboard from '../pages/Dashboard';
import Settings from '../pages/Settings';
// Customers
import Customers from '../pages/Customer/Customers';
import NewUser from '../pages/Customer/NewUser';
import EditCustomer from '../pages/Customer/EditCustomer';
// Courses
import Courses from '../pages/Course/Courses';
import NewCourse from '../pages/Course/NewCourse';
import EditCourse from '../pages/Course/EditCourse';
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
                    <Route path="/dashboard" element={ <Dashboard /> } />
                    <Route path="/customers" element={ <Customers /> } />
                    <Route path="/customers/new" element={ <NewUser /> } />
                    <Route path="/customers/:id" element={ <EditCustomer /> } />
                    <Route path="/courses" element={ <Courses /> } />
                    <Route path="/courses/new" element={ <NewCourse /> } />
                    <Route path="/courses/:id" element={ <EditCourse /> } />
                    <Route path="/settings" element={ <Settings /> } />
                    <Route path="/attributes" element={ <Attributes /> } />
                    <Route path="/attributes/new" element={ <NewAttribute /> } />
                    <Route path="/attributes/:id" element={ <EditAttribute /> } />
                </Routes>
            </div>
        </div>
    );
};

export default BaseAdminRoutes;