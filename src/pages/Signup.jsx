import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import { signUpValiationSchema } from '../utils/schema';

const styles = {
  label: 'font-inter mt-1.5 mb-1.5 text-[16px] font-normal text-gray-600',
  input: 'w-full font-outfit min-h-12 py-2.5 px-3.75 rounded-xl bg-white border border-solid border-[#cbd5e1] text-[#1e293b] text-[15px] outline-[#0e7090] ',
  errors: 'text-[13px] font-inter ml-1 text-red-500 top-0 mb-2'
}

const FormField = ({ formik, name, label, type = 'text', placeholder }) => (
  <div className='flex flex-col gap-1'>
    <label htmlFor={name} className={styles.label}>{label}</label>
    <div>
      <input
        id={name}
        type={type}
        name={name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name]}
        className={styles.input}
        placeholder={placeholder}
      />
      {formik.touched[name] && formik.errors[name] && <p className={styles.errors}>{formik.errors[name]}</p>}
    </div>
  </div>
)

const SignupPage = () => {
  const navigate = useNavigate()

  const handleLoginPageNavigation = () => {
    navigate('/signin')
  }

  // Handle form submission using Formik (validation and state management)
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false
    },
    validationSchema: signUpValiationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log('Form submitted: ', values)
      resetForm()
      alert('Form submitted successfully!')
    }
  })

  return (
    <div className='w-full h-screen flex flex-col bg-white'>

      {/* Create Account Section */}
      <div className='h-auto my-auto self-center py-10 items-center flex flex-col gap-3 w-[85%] sm:w-[70%] md:w-[50%] lg:w-[33%] xl:w-[23%]'>
        <h1 className='text-center text-[31px] font-inter font-semibold leading-7.5'>Create an account</h1>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className='flex flex-col gap-1.5 mt-3 self-center'>

          {/* Name field */}
          <FormField formik={formik} name='name' label='Name' type='text' placeholder='Enter your name' />

          {/* Email field */}
          <FormField formik={formik} name='email' label='Email' type='email' placeholder='Enter your email address' />

          {/* Password field */}
          <FormField formik={formik} name='password' label='Password' type='password' placeholder='Enter your password' />

          {/* Confirm Password field */}
          <FormField formik={formik} name='confirmPassword' label='Confirm Password' type='password' placeholder='Confirm your password' />

          {/* Checkbox for terms */}
          <div className='flex flex-col mt-2'>
            <div className='flex  items-center gap-2'>
              <input
                type='checkbox'
                id='terms'
                name='agreeToTerms'
                className='w-4 h-4 text-[#344054]'
                checked={formik.values.agreeToTerms}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor='terms' className='font-inter text-[17px] font-normal text-gray-600'>I agree to the terms and conditions</label>
            </div>
            {formik.touched.agreeToTerms && formik.errors.agreeToTerms && <p className="text-[13px] font-inter ml-1 text-red-500 top-0 mb-2">{formik.errors.agreeToTerms}</p>}
          </div>

          <button
            type='submit'
            className='self-center font-inter rounded-sm w-full h-8 flex justify-center mt-2 items-center text-[14px] font-medium leading-[14.5] cursor-pointer
                     border border-[#164c63] hover:border-0 bg-[#164c63] hover:bg-[#2a6d8a] transition-colors duration-300 py-2.5 px-4.5 text-white outline-none'>
            Sign up
          </button>

        </form>

        {/* log in page navigation */}
        <p className='text-[16.5px] text-center mt-1 font-inter font-medium text-black'>Already have a account?   <span onClick={() => handleLoginPageNavigation()}
          className='text-[#0d384a] font-semibold cursor-pointer hover:text-blue-500 transition-colors duration-200 underline'> Log in</span></p>

      </div>

      {/* footer section */}
      <footer className='w-full font-outfit h-auto flex justify-center items-center mt-2 self-end mb-2'>
        <p className='text-md font-medium text-gray-600'>© FOREAL PROPERTY 2027</p>
      </footer>

    </div>
  )
}

export default SignupPage
