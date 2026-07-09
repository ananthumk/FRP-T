import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import loginValidationSchema from '../utils/schema';
import FormField from '../components/FormField';



const LoginPage = () => {
    const navigate = useNavigate()

    const navigateToSignup = () => {
        navigate('/signup')
    }

    // Handle form submission using Formik (validation and state management)
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: loginValidationSchema,
        onSubmit: (values, { resetForm }) => {
            console.log('Form submitted: ', values)
            resetForm()
            alert('Form submitted successfully!')
        }
    })


    return (
        <div className='w-full min-h-dvh flex flex-col bg-white'>

            {/* Login section */}
            <div className='h-auto my-auto self-center items-center flex flex-col gap-3 w-[85%] sm:w-[70%] md:w-[50%] lg:w-[33%] xl:w-[23%]'>
                <img src='https://forealproperty.com.au:8001/assets/images/mainLogo.png'
                    className='h-31.5 w-38 mt-5 bottom-2.5'
                    alt='company-logo'
                />

                <div className='w-full h-auto flex flex-col gap-1 justify-center items-center mt-1'>
                    <h1 className='text-[31px] font-inter relative font-semibold leading-7.5'>Log in</h1>

                    {/* Form */}
                    <form onSubmit={formik.handleSubmit} className='w-full flex flex-col justify-start gap-0 mt-1'>

                        {/* email Form */}
                        <FormField
                            formik={formik}
                            name='email'
                            label='Email'
                            type='email'
                            placeholder='Enter your email'
                        />

                        {/* password Form */}
                        <FormField
                            formik={formik}
                            name='password'
                            label='Password'
                            type='password'
                            placeholder='Enter your password'
                        />

                        {/* Remember & forget password */}
                        <div className='flex pt-1.5 pb-2.5 flex-wrap gap-px items-stretch justify-between'>

                            <div className='flex justify-center items-center gap-2'>
                                <input type='checkbox' id='rememberMe' className='w-4 h-4 text-[#344054] font-normal leading-7' />
                                <label htmlFor='rememberMe' className='mr-3 sm:mr-0 font-outfit text-[16.5px] font-normal text-gray-600'>Remember me</label>
                            </div>

                            <a href='#' className='cursor-pointer font-inter font-medium text-[#010506] text-[16px] hover:text-[#0e7090] transition-colors duration-300'>Forgot Password</a>
                        </div>

                        {/* Submit button */}
                        <button
                            type='submit'
                            className="self-center font-inter rounded-sm w-37.5 h-7.5 flex justify-center mt-2 items-center text-[13px] font-medium leading-[14.5] cursor-pointer
                                   border border-[#164c63] hover:border-0 bg-[#164c63] hover:bg-[#2a6d8a] transition-colors duration-300 py-2.5 px-4.5 text-white outline-none"
                        >
                            Sign in
                        </button>
                    </form>

                </div>

                {/* sign up page navigation */}
                <p className='text-[16.5px] font-inter font-medium text-black mt-1'>Don't have an account?   <span onClick={() => navigateToSignup()}
                    className='text-[#0d384a] font-semibold cursor-pointer hover:text-blue-500 transition-colors duration-200 underline'> Signup</span></p>

            </div>

            {/* footer section */}
            <footer className='w-full font-outfit h-auto flex justify-center items-center mt-auto mb-4'>
                <p className='text-md font-medium text-gray-600'>© FOREAL PROPERTY 2027</p>
            </footer>
        </div>
    )
}

export default LoginPage