
export const nameRules = [
              { required: true, message: 'Name is required' },
              { min: 3, message: 'Name should have at least 3 character' }
            ]

export const emailRules = [
              { required: true, message: 'Email is required' },
              { type: 'email', message: 'Enter a vaild email address' }
            ]

export const passwordRules = [
              { required: true, message: 'Password is required' },
              { min: 8, message: 'Password should have at least 8 character' }
            ]
