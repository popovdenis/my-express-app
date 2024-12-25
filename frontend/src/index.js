import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AdminApp from './AdminApp';
import { AuthProvider } from './contexts/auth';
import { AdminAuthProvider } from './contexts/adminAuth';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
if (window.location.pathname.startsWith('/admin')) {
    root.render(
        <AdminAuthProvider>
            <AdminApp />
        </AdminAuthProvider>
    );
} else {
    root.render(
        <AuthProvider>
            <App />
        </AuthProvider>
    );
}