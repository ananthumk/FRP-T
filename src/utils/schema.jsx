import * as Yup from 'yup';

export const nameSchema = Yup.string()
.min(3, 'Name should have at least 3 character')
.required('Name is required')

export const emailSchema = Yup.string()
.email('Enter a valid email address')
.required('Email is required')

export const passwordSchema = Yup.string()
.min(8, 'Password should have at least 8 characters')
.required('Password is required')

export const confirmPasswordSchema = Yup.string()
.oneOf([Yup.ref('password')], 'Passwords must match')
.required('Confirm Password is required')

export const termsSchema = Yup.boolean()
.oneOf([true], 'You must accept the terms and conditions')
.required('You must accept the terms and conditions')

// Validation schema for login form
export const loginValidationSchema = Yup.object({
    email: emailSchema,
    password: passwordSchema
})

// Validation schema for signup form
export const signUpValiationSchema = Yup.object({
    name: nameSchema, 
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
    agreeToTerms: termsSchema
})

export default loginValidationSchema