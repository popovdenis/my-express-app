import React from 'react';
import ReactDOM from 'react-dom/client';
import AdminApp from './admin/AdminApp';
import ClientApp from './client/ClientApp';
import './styles/index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
if (window.location.pathname.startsWith('/admin')) {
    root.render(
        <AdminApp />
    );
} else {
    root.render(
        <ClientApp />
    );
}