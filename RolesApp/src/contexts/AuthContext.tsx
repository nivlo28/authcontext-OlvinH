import React, { createContext, useContext, useState } from 'react';


type Role = 'admin' | 'common' | null;

type AuthContextType = {
    role: Role;
    isAuthenticated: boolean;
    login: (role: 'admin' | 'common') => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }

    return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [role, setRole] = useState<Role>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = (role: 'admin' | 'common') => {
        setRole(role);
        setIsAuthenticated(true);
    };

    const logout = () => {
        setRole(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ role, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
