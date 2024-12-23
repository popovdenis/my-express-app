import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/auth';
import ProtectedRoute from './components/ProtectedRoute';
import MyAccount from './pages/MyAccount';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Menu from './components/Menu';

const App = () => {
    return (
        // <AuthProvider>
            <Router>
                <Menu />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/my-account" element={
                        <ProtectedRoute>
                            <MyAccount />
                        </ProtectedRoute>
                    } />
                </Routes>
            </Router>
        // </AuthProvider>
    );
};

export default App;