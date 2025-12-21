import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token'));

    // Check if user is logged in on mount
    useEffect(() => {
        const checkAuth = async () => {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                try {
                    const response = await authAPI.getMe();
                    setUser(response.data.data);
                    setToken(storedToken);
                } catch (error) {
                    localStorage.removeItem('token');
                    setToken(null);
                }
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await authAPI.login({ email, password });
            const { token, data } = response.data;

            localStorage.setItem('token', token);
            setToken(token);
            setUser(data);

            return { success: true, user: data };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const register = async (userData) => {
        try {
            const response = await authAPI.register(userData);
            const { token, data } = response.data;

            localStorage.setItem('token', token);
            setToken(token);
            setUser(data);

            return { success: true, user: data };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Registration failed'
            };
        }
    };

    const updateProfile = async (userData) => {
        try {
            const response = await authAPI.updateProfile(userData);
            const updatedUser = response.data.data;
            setUser(updatedUser);
            return { success: true, user: updatedUser };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Update failed'
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    // Address management functions
    const addAddress = async (addressData) => {
        try {
            const response = await authAPI.addAddress(addressData);
            const updatedUser = response.data.data;
            setUser(updatedUser);
            return { success: true, user: updatedUser };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to add address'
            };
        }
    };

    const updateAddress = async (id, addressData) => {
        try {
            const response = await authAPI.updateAddress(id, addressData);
            const updatedUser = response.data.data;
            setUser(updatedUser);
            return { success: true, user: updatedUser };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to update address'
            };
        }
    };

    const deleteAddress = async (id) => {
        try {
            const response = await authAPI.deleteAddress(id);
            const updatedUser = response.data.data;
            setUser(updatedUser);
            return { success: true, user: updatedUser };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to delete address'
            };
        }
    };

    const setDefaultAddress = async (id) => {
        try {
            const response = await authAPI.setDefaultAddress(id);
            const updatedUser = response.data.data;
            setUser(updatedUser);
            return { success: true, user: updatedUser };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to set default address'
            };
        }
    };

    const value = {
        user,
        token,
        loading,
        login,
        register,
        updateProfile,
        logout,
        isAuthenticated: !!token,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
