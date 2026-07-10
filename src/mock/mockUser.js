const mockUser = [
    { email: 'arun@example.com', password: 'password@123' },
    { email: 'rahul@example.com', password: 'password' }
]

let activeResetEmail = null

export const getUserByEmail = (email) => {
    const currentEmail = email
    return mockUser.find((user) => user.email === currentEmail)
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

export const checkCredentials = (email, password ) => {
    const user = getUserByEmail(email)

    if (!user || user.password !== password) {
        return false
    }

    return true
}