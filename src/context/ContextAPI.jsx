import { createContext, useContext, useEffect, useState } from "react"
import storage from "../utils/localStorage"

const combinations = "ABCDEFG1234567890abcdefg"

const createToken = () => {
    return Array.from({ length: 10 }, () => combinations[Math.floor(Math.random() * combinations.length)]).join("")
}

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [token, setToken] = useState(null)
    const [lastVisitedPath, setLastVisitedPath] = useState(null)
    const [agencyId, setAgencyId] = useState(null)

    useEffect(() => {
        const user = storage.get('Current_user')
        const t = storage.get('token')
        const path = storage.get('lastVisitedPath')
        setCurrentUser(user || null)
        setToken(t || null)
        setLastVisitedPath(path)
        setAgencyId(storage.get('agencyId') || null)
    }, [])
    
    const login = (user) => {
        console.log(user)
        const t = createToken()
        storage.set('Current_user', JSON.stringify(user))
        storage.set('token', t)
        storage.set('agencyId', 1)
        setCurrentUser(JSON.stringify(user))
        setToken(t)
        setAgencyId(1)
    }

    const logout = () => {
        setCurrentUser(null)
        setToken(null)
        setAgencyId(null)
        storage.remove('Current_user')
        storage.remove('token')
        storage.remove('agencyId')
        storage.remove('lastVisitedPath')
        setLastVisitedPath(null)
    }

    const updatedLastVisitedPath = (path) => {
        setLastVisitedPath(path)
        storage.set('lastVisitedPath', path)
    }

    return (
        <AuthContext.Provider value={{ user: currentUser, token, lastVisitedPath, agencyId, login, logout, updatedLastVisitedPath }}>
             {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
   return useContext(AuthContext)
}