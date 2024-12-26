import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AdminAppRoutes from "./admin/routes/AdminAppRoutes";
import { NotificationProvider } from './contexts/NotificationContext';
import Notification from './components/Notification';

const AdminApp = () => {
    return (
        <NotificationProvider>
            <BrowserRouter>
                <Notification />
                <AdminAppRoutes />
            </BrowserRouter>
        </NotificationProvider>
    );
};

export default AdminApp;