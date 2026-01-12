import React, { createContext, useContext, useState, useEffect } from 'react';

export const IdentityContext = createContext();

export const IdentityProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('guest_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (name, bio = '') => {
        const newUser = {
            id: 'guest_' + Date.now(),
            name,
            bio,
            avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${name}`,
            role: 'guest'
        };
        setUser(newUser);
        localStorage.setItem('guest_user', JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('guest_user');
    };

    return (
        <IdentityContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </IdentityContext.Provider>
    );
};
