import React from 'react'
import { Navigate } from 'react-router-dom'
import { UserAuth } from './AuthConext';
export default function Protected({ children }) {
    const { user } = UserAuth();
    if (!user) {
        return <Navigate to='/signin' />
    }
    return children;
}