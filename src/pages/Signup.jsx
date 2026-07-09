import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Checkbox } from 'antd'
import { emailRules, nameRules, passwordRules } from '../utils/schema';
import FormField from '../components/FormField';
import Copyright from '../components/Copyright';


const SignupPage = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const handleLoginPageNavigation = () => {
    navigate('/signin')
  }
  
  const onFinish = (values) => {
     console.log('Form submitted: ', values)
     form.resetFields()
     alert('Creating the account is successfull!')
  }

  return (
    <div className='w-full min-h-dvh flex flex-col bg-white'>

      {/* Create Account Section */}
      <div className='h-auto my-auto self-center py-5 items-center flex flex-col gap-2 w-[85%] sm:w-[70%] md:w-[50%] lg:w-[33%] xl:w-[23%]'>
        <h1 className='text-center text-[31px] font-inter font-semibold leading-7.5'>Create an account</h1>

        {/* Form */}
        <Form 
          form={form}
          layout='vertical'
          className='w-full'
          onFinish={onFinish}
          >

          {/* Name form field */}
          <FormField label='Name' name='Name' type='text' placeholder='Enter your name'
            rules={nameRules} />

          {/* Email form field */}
          <FormField label='Email' name='Email' type='email' placeholder='Enter your email'
            rules={emailRules} />

          {/* Password form field */}
          <FormField label='Password' name='Password' type='password' placeholder='Enter your password'
            rules={passwordRules} />

          <FormField label='Confirm Password' name='ConfirmPassword' type='password' placeholder='Confirm your password'
            dependencies={['Password']}
            rules={[
              { required: true, message: 'Confirm Password is required' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('Password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Passwords do not match'))
                }
              })
            ]} />
          
          <div className=''>
          <Form.Item 
           name='agreeToTerms'
           valuePropName='checked'
           rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error('You must agree to terms and conditions'))
            }
           ]} 
          >
            <Checkbox>I agree to the terms and conditions</Checkbox>
          </Form.Item>
          </div>
          
          <Button type='primary' htmlType='submit' block>
            Sign up
          </Button>
        </Form>

        {/* log in page navigation */}
        <p className='text-[16.5px] text-center mt-1 font-inter font-medium text-black'>Already have a account?   <span onClick={() => handleLoginPageNavigation()}
          className='text-[#0d384a] font-semibold cursor-pointer hover:text-blue-500 transition-colors duration-200 underline'> Log in</span></p>

      </div>

      {/* copyright section */}
      <Copyright />

    </div>
  )
}

export default SignupPage
