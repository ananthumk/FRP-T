const mockUser = [
    { name: 'Arun', email: 'arun@example.com', password: 'arun@1234' },
    { name: 'Rahul', email: 'rahul@example.com', password: 'rahul@1234' }
]

let activeResetEmail = null

export const getUserByEmail = (email) => {
    const currentEmail = email
    return mockUser.find((user) => user.email === currentEmail)
}

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
    return true
}

export const checkCredentials = (email, password) => {
    const user = getUserByEmail(email)

    if (!user || user.password !== password) {
        return false
    }

    return true
}