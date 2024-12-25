import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminApp from '../AdminApp';
import AdminSignIn from '../pages/AdminSignIn';

const AdminAppRoutes = () => {
    return (
        <Routes>
            <Route path="/admin/signin" element={<AdminSignIn />} />
            <Route path="/admin/*" element={<AdminApp />} />
        </Routes>
    );
};

export default AdminAppRoutes;