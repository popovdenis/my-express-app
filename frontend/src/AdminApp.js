import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AdminAppRoutes from "./admin/routes/AdminAppRoutes";
import { NotificationProvider } from './contexts/NotificationContext';
import Notification from './components/Notification';
import { AdminAuthProvider } from './contexts/AdminAuth';

const AdminApp = () => {
    return (
        <AdminAuthProvider>
            <NotificationProvider>
                <BrowserRouter>
                    <Notification />
                    <AdminAppRoutes />
                </BrowserRouter>
            </NotificationProvider>
        </AdminAuthProvider>
    );
};

export default AdminApp;