// frontend/src/context/AuthContext.jsx

import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Instale com: npm install jwt-decode

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(JSON.parse(localStorage.getItem('authTokens')).access) : null);

    const loginUser = (tokens) => {
        setAuthTokens(tokens);
        setUser(jwtDecode(tokens.access));
        localStorage.setItem('authTokens', JSON.stringify(tokens));
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
    };

    const contextData = {
        user,
        authTokens,
        loginUser,
        logoutUser,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};