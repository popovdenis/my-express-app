import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Menu from './components/Menu';
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from './contexts/Auth';

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Menu />
                <AppRoutes />
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;