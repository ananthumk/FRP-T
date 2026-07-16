import React, { useEffect } from 'react'
import { useAuth } from '../../context/ContextAPI'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const { token, updatedLastVisitedPath } = useAuth()
    const location = useLocation()
    const authToken = token || localStorage.getItem('token')

    const path = location.pathname
     
    useEffect(() => {
        if (authToken) {
            updatedLastVisitedPath(path)
        }
    }, [path, authToken])

    if (!authToken) return <Navigate to='/signin' replace />
    return children 
}

export default ProtectedRoute
