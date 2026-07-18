import { Grid } from 'antd'
import React, { useEffect } from 'react'
import { useAuth } from '../../context/ContextAPI'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../Sidebar'
import storage from '../../utils/localStorage'

const ProtectedRoute = () => {
    const { token, updatedLastVisitedPath } = useAuth()
    const location = useLocation()
    const screens = Grid.useBreakpoint()
    const isMobile = !screens.md
    const authToken = token || storage.get('token')

    const path = location.pathname
     
    useEffect(() => {
        if (authToken) {
            updatedLastVisitedPath(path)
        }
    }, [path, authToken])

    if (!authToken) return <Navigate to='/signin' replace />

    return (
        <div className='min-h-screen md:flex overflow-x-hidden'>
            <Sidebar />
            <div className='flex-1 w-full xl:ml-64'>
                <Outlet />
            </div>
        </div>
    )
}

export default ProtectedRoute
