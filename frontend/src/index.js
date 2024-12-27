import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AdminApp from './AdminApp';
import './styles/index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
if (window.location.pathname.startsWith('/admin')) {
    root.render(
        <AdminApp />
    );
} else {
    root.render(
        <App />
    );
}