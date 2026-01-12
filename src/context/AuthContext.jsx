import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedAuth = localStorage.getItem('blog_auth_token');
        if (storedAuth === 'valid_session_token') {
            setIsAuthenticated(true);
            // Restore mock user
            setUser({
                name: 'Sumanth Udupi',
                role: 'Admin',
                avatar: 'https://ui-avatars.com/api/?name=Sumanth+Udupi&background=d4af37&color=fff',
                joined: 'January 2024',
                badges: ['Founder', 'Scribe', 'Architect']
            });
        }
        setLoading(false);
    }, []);

    const login = (password) => {
        // Simple hardcoded password for demonstration/MVP
        if (password === 'odisha2024') {
            localStorage.setItem('blog_auth_token', 'valid_session_token');
            setIsAuthenticated(true);
            setUser({
                name: 'Sumanth Udupi',
                role: 'Admin',
                avatar: 'https://ui-avatars.com/api/?name=Sumanth+Udupi&background=d4af37&color=fff',
                joined: 'January 2024',
                badges: ['Founder', 'Scribe', 'Architect']
            });
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem('blog_auth_token');
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
