import React, { useEffect } from 'react';

const SignOut = () => {
    useEffect(() => {
        localStorage.removeItem('token');
        console.log('User signed out');
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">You have been signed out.</h1>
        </div>
    );
};

export default SignOut;