import React from 'react'
import { getToken } from '../utils/auth'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({children}) {
    const token = getToken()

    if(!token) return <Navigate to="/" />

    return children;
}

export default ProtectedRoute