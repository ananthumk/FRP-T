
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
      if (!value || (value.length >=8 && value.length <= 15)) {
        return Promise.resolve()
      }
      return Promise.reject(new Error('Password field allow only 8-15 characters'))
    }
  }
]
