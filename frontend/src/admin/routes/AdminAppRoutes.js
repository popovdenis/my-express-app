import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminSignIn from '../pages/AdminSignIn';
import BaseAdminRoutes from './BaseAdminRoutes';

const AdminAppRoutes = () => {
    return (
        <Routes>
            <Route path="/admin/signin" element={<AdminSignIn />} />
            <Route path="/admin/*" element={<BaseAdminRoutes />} />
        </Routes>
    );
};

export default AdminAppRoutes;