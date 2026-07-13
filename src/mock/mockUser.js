const lsText = import.meta.env.LOCALSTORAGE_KEY

const defaultUser = [
    { name: 'Arun', email: 'arun@example.com', password: 'arun@1234' },
    { name: 'Rahul', email: 'rahul@example.com', password: 'rahul@1234' }
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

    mockUser.push({
        name: name?.trim() || 'User',
        email: email,
        password
    })

    saveUser(mockUser)

    return { success: true, message: 'User added successfully' }
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

    return true
}