import { message } from "antd"

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

export const selectRules = [
  {required: true, message: 'Please select an option'}
]

export const addressRules = [
  {required: true, message: 'Address is required'},
  {max: 50, message: 'Address can only have at most 50 character'}
]

export const streetNumberRule = [
  {required: true, message: 'Street Number is required'}
]

export const streetNameRule = [
  {required: true, message: 'Street Name is required'}
]

export const suburbRule = [
  {required: true, message: 'Suburb is required'}
]

export const stateRule = [
  {required: true, message: 'State Name is required'}
]

export const postCodeRule = [
  {required: true, message: 'Post Code is required'}
]

export const routineInspectionFrequencyRules = [
  {required: true, message: 'Routine Inspection Frequency is required'}
]

export const lastDateInspectionRule = [
  {required: true, message: 'Last Date Inspection is required'}
]



