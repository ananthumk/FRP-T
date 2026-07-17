const lsText = import.meta.env.VITE_LOCALSTORAGE_KEY

const defaultUser = [
    { userId: 1, name: 'Arun', email: 'arun@example.com', password: 'arun@1234' },
    { userId: 2, name: 'Rahul', email: 'rahul@example.com', password: 'rahul@1234' }
]


// Load user from localstorage
const loadUsers = () => {
    try {
        const stored = localStorage.getItem(lsText)
        return stored ? JSON.parse(stored) : defaultUser
    } catch (error) {
        return defaultUser
    }
}

// Store users to localStorage
const saveUser = (users) => {
    localStorage.setItem(lsText, JSON.stringify(users))
}

let mockUser = loadUsers()
let activeResetEmail = null


export const getUserByEmail = (email) => {
    const currentEmail = email
    return mockUser.find((user) => user.email === currentEmail)
}

// Add user
export const addUserByEmail = (email, password, name = '') => {

    const existingUser = getUserByEmail(email)
    if (existingUser) {
        return { success: false, message: 'User already exists' }
    }

    const lastUser = mockUser[mockUser.length - 1] || { userId: 0 }
    const newUser = {
        userId: lastUser.userId + 1,
        name: name?.trim() || 'User',
        email: email,
        password
    }

    mockUser.push(newUser)
    saveUser(mockUser)

    return { success: true, message: 'User added successfully', user: {
        userId: newUser.userId,
        name: newUser.name,
        email: newUser.email
    } }
}

export const setActiveResetEmail = (email) => {
    activeResetEmail = email || null
}

export const getActiveResetEmail = () => activeResetEmail

export const updateUserPassword = (email, newPassword) => {
    const user = getUserByEmail(email)
    if (!user) return false

    user.password = newPassword
    saveUser(mockUser)
    return true
}

export const checkCredentials = (email, password) => {
    const user = getUserByEmail(email)

    if (!user || user.password !== password) {
        return false
    }

    return {status: true, user: {
        userId: user.userId,
        name: user.name,
        email: user.email
    }}
}