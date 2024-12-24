import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Menu from './components/Menu';
import AppRoutes from "./routes/AppRoutes";

const App = () => {
    return (
        <Router>
            <Menu />
            <AppRoutes />
        </Router>
    );
};

export default App;