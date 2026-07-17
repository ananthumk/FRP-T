import React from 'react'
import { SafetyOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { Button, Form, message } from 'antd'
import FormField from '../../components/FormField'
import { passwordRules } from '../../utils/schema'
import Copyright from '../../components/Copyright'
import { customRequiredMark } from '../../utils/RequiredMark'
import { getActiveResetEmail, updateUserPassword, setActiveResetEmail } from '../../mock/mockUser'

const ResetPassword = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm()

    const onFinish = (values) => {
        const email = getActiveResetEmail()

        if (!email) {
            message.error('Please request a password reset first.')
            navigate('/forgot-password')
            return
        }

        const isUpdated = updateUserPassword(email, values['New Password'])

        if (!isUpdated) {
            message.error('Unable to reset password. Please try again.')
            return
        }

        setActiveResetEmail(null)
        form.resetFields()
        message.success('Password Reset successfully!')
        setTimeout(() => {
          navigate('/signin')  
        }, 500);
    }
    return (
        <div className='bg-white min-h-dvh font-inter flex flex-col items-center'>

            <div className='h-auto my-auto flex flex-col py-5 px-4 gap-2.5'>

                <div className='flex items-center gap-3'>
                    <div className='border border-gray-700 rounded-lg p-1'>
                        <SafetyOutlined className='text-4xl align-middle!' />
                    </div>
                    <span className='text-[32px] font-bold'>Reset Password</span>
                </div>

                <Form
                    form={form}
                    layout='vertical'
                    onFinish={onFinish}
                    className='w-full'
                    requiredMark={customRequiredMark}
                >

                    {/* New Password form field */}
                    <FormField label='New Password' name='New Password' type='password' placeholder='Enter your new password'
                        rules={passwordRules} />

                    {/* Confirm new password form field */}
                    <FormField label='Confirm New Password' name='ConfirmNewPassword' type='password' placeholder='Confirm your new password'
                        dependencies={['New Password']}
                        rules={[
                            { required: true, message: 'Confirm new Password is required' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('New Password') === value) {
                                        return Promise.resolve()
                                    }
                                    return Promise.reject(new Error('Passwords do not match'))
                                }
                            })
                        ]} />

                    <Button type='primary' htmlType='submit' block>
                        Reset Password
                    </Button>
                </Form>

                <div onClick={() => navigate('/forgot-password')} className='flex self-center cursor-pointer text-[#164c63] hover:text-[#2a6d8a] transition-colors duration-300 items-center gap-2'>
                    <ArrowLeftOutlined className='text-xl align-middle!' />
                    <span className='text-[15px]  font-semibold'>Back to Forgot Password</span>

                </div>
            </div>

             <Copyright />
        </div>
    )
}

export default ResetPassword
