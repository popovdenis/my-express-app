import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AdminAppRoutes from "./admin/routes/AdminAppRoutes";

const AdminApp = () => {
    return (
        <BrowserRouter>
            <AdminAppRoutes />
        </BrowserRouter>
    );
};

export default AdminApp;