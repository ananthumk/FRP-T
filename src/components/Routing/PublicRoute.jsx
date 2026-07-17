import React from 'react'
import {Navigate} from 'react-router-dom'
import { useAuth } from '../../context/ContextAPI'
import storage from '../../utils/localStorage'

const PublicRoute = ({children}) => {
  const {token, lastVisitedPath} = useAuth()
  const authToken = token || storage.get('token')

  if (token){
    return <Navigate to={lastVisitedPath} replace />
  }

  return children
}

export default PublicRoute
