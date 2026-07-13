
export const nameRules = [
  { required: true, message: 'Name is required' },
  { min: 3, message: 'Name should have at least 3 character' },
  { pattern: /^[A-Za-z\s]+$/, message: 'Name can only contain letters'}
]

export const emailRules = [
  { required: true, message: 'Email is required' },
  { type: 'email', message: 'Enter a vaild email address' },
  { pattern: /^\S+$/, message: 'Email cannot contain spaces'},
  { pattern: /^[^A-Z]+$/, message: 'Email must be lowercase only'}
]

export const passwordRules = [
  { required: true, message: 'Password is required' },
  { pattern: /^\S+$/, message: 'Space is not allowed'},
  {
    validator: (_, value) => {
      if (value.length < 8) {
        return Promise.reject(new Error('Password must have at least 8 characters'))
      }
      if (value.length > 15) {
        return Promise.reject(new Error('Password can have at most 15 characters'))
      }
      return Promise.resolve()
    }
  }
]
