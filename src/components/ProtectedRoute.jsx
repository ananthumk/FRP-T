import React from 'react'
import { useAuth } from '../context/ContextAPI'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, element }) => {
    const { token } = useAuth()
    const authToken = token || localStorage.getItem('token')
    if (!authToken) return <Navigate to='/signin' replace />
    return children ?? element
}

export default ProtectedRoute
