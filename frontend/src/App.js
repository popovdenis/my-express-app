import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Menu from './components/Menu';
import AppRoutes from "./routes/AppRoutes";

const App = () => {
    return (
        <BrowserRouter>
            <Menu />
            <AppRoutes />
        </BrowserRouter>
    );
};

export default App;