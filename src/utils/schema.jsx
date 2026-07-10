
export const nameRules = [
  { required: true, message: 'Name is required' },
  { min: 3, message: 'Name should have at least 3 character' }
]

export const emailRules = [
  { required: true, message: 'Email is required' },
  { type: 'email', message: 'Enter a vaild email address' },
  { pattern: /^\S+$/, message: 'Email cannot contain spaces'},
  { pattern: /^[^A-Z]+$/, message: 'Email must be lowercase only'}
]

export const passwordRules = [
  { required: true, message: 'Password is required' },
  { min: 8, message: 'Password should have at least 8 character' },
  { pattern: /^\S+$/, message: 'Space is not allowed'},
  { max: 15, message: 'Password can have at most 15 character'},
]
