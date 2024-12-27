import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Menu from './components/Menu';
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from './contexts/Auth';
import { NotificationProvider } from '../contexts/NotificationContext';
import Notification from "../components/Notification";

const ClientApp = () => {
    return (
        <AuthProvider>
            <NotificationProvider>
                <BrowserRouter>
                    <Menu />
                    <Notification />
                    <AppRoutes />
                </BrowserRouter>
            </NotificationProvider>
        </AuthProvider>
    );
};

export default ClientApp;