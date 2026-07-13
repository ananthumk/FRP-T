import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Checkbox, message } from 'antd'
import FormField from '../components/FormField';
import Copyright from '../components/Copyright';
import { emailRules, passwordRules } from '../utils/schema';
import { customRequiredMark } from '../utils/RequiredMark';
import { checkCredentials } from '../mock/mockUser';


const LoginPage = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm()

    const navigateToSignup = () => {
        navigate('/signup')
    }

    const onFinish = (values) => {
        const result = checkCredentials(values.Email, values.Password)
        console.log(result)
        if (!result) {
            message.error('Invalid Credentials')
            return
        }

        message.success('Logged in successfully')
        form.resetFields()
        setTimeout(() => {navigate('/list-property')}, 1000)
        
    }



    return (
        <div className='w-full min-h-dvh flex flex-col bg-white'>

            {/* Login section */}
            <div className='h-auto my-auto self-center items-center flex flex-col gap-3 w-[85%] sm:w-[70%] md:w-[50%] lg:w-[33%] xl:w-[23%]'>
                <img src='https://forealproperty.com.au:8001/assets/images/mainLogo.png'
                    className='h-31.5 w-38 mt-5 bottom-2.5'
                    alt='company-logo'
                />

                <div className='w-full h-auto flex flex-col gap-1 justify-center items-center mt-1'>
                    <h1 className='text-[31px] font-inter relative font-semibold leading-7.5'>LOGIN</h1>

                    {/* Form */}

                    <Form
                        form={form}
                        layout='vertical'
                        onFinish={onFinish}
                        className='w-full'
                        requiredMark={customRequiredMark}
                    >

                        {/* Email Form Field */}
                        <FormField label='Email' name='Email' type='email' placeholder='Enter your email'
                            rules={emailRules} />

                        {/* Password Form Field */}
                        <FormField label='Password' name='Password' type='password' placeholder='Enter your password'
                            rules={passwordRules} />


                        {/* Remember & forget password */}
                        <div className='flex pt-1.5 pb-2.5 flex-wrap gap-px items-stretch justify-between'>

                            <Form.Item name='rememberMe' valuePropName='checked' noStyle>
                                <Checkbox>Remember Me</Checkbox>
                            </Form.Item>

                            <a onClick={() => navigate('/forgot-password')} className='text-[#010506]! text-[16px] hover:text-[#0e7090]! transition-colors duration-300'>Forgot Password</a>
                        </div>
                        <Form.Item className='flex justify-center'>
                            <Button type='primary' htmlType='submit' className='w-37.5!'>SIGN IN</Button>
                        </Form.Item>
                    </Form>

                </div>

                {/* sign up page navigation */}
                <p className='text-[16.5px] font-inter font-medium text-black mt-1'>Don't have an account?   <span onClick={navigateToSignup}
                    className='text-[#0d384a] font-semibold cursor-pointer hover:text-blue-500 transition-colors duration-200 underline'
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ''){
                            navigateToSignup()
                        }
                    }}
                    > Signup</span></p>

            </div >

            {/* copyright section */}
            <Copyright />
        </div >
    )
}

export default LoginPage