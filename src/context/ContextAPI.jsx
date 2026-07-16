import { createContext, useContext, useEffect, useState } from "react"

const combinations = "ABCDEFG1234567890abcdefg"

const createToken = () => {
    return Array.from({ length: 10 }, () => combinations[Math.floor(Math.random() * combinations.length)]).join("")
}

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [token, setToken] = useState(null)

    useEffect(() => {
        const user = localStorage.getItem('Current_user')
        const t = localStorage.getItem('token')
        setCurrentUser(user || null)
        setToken(t || null)
    }, [])
    
    const login = (email) => {
        const t = createToken()
        localStorage.setItem('Current_user', email)
        localStorage.setItem('token', t)
        setCurrentUser(email)
        setToken(t)
    }

    const logout = () => {
        setCurrentUser(null)
        setToken(null)
        localStorage.removeItem('Current_user')
        localStorage.removeItem('token')
    }

    return (
        <AuthContext.Provider value={{ user: currentUser, token, login, logout }}>
             {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
   return useContext(AuthContext)
}