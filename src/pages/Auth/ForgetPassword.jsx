import { Button, Form, Input, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { KeyOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import FormField from '../../components/FormField'
import { emailRules } from '../../utils/schema'
import Copyright from '../../components/Copyright'
import { customRequiredMark } from '../../utils/RequiredMark'
import { getUserByEmail, setActiveResetEmail } from '../../mock/mockUser'

const OTP_VALIDITY_SECONDS = 1 * 60

const ForgetPassword = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm()

    const [otpSent, setOtpSent] = useState(false)
    const [timeLeft, setTimeLeft] = useState(OTP_VALIDITY_SECONDS)
    const [expired, setExpired] = useState(false)

    // Count Down of timeleft
    useEffect(() => {
        if (!otpSent) return

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval)
                    setExpired(true)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [otpSent])

    // Format Time
    const formatTime = (seconds) => {
        const m = String(Math.floor(seconds / 60)).padStart(2, '0')
        const s = String(seconds % 60).padStart(2, '0')
        return `${m}:${s}`
    }

    const handleGetOtp = async () => {
        try {
            form.resetFields(['otp'])
            await form.validateFields(['email'])
            const email = form.getFieldValue('email')
            const user = getUserByEmail(email)

            if (!user) {
                setActiveResetEmail(null)
                message.error('Email not found. Please enter a registered email.')
                return
            }

            setActiveResetEmail(email)
            setOtpSent(true)
            setExpired(false)
            setTimeLeft(OTP_VALIDITY_SECONDS)
            form.setFieldValue('otp', undefined)
            message.success('OTP sent successfully.')
        } catch {

        }
    }

    const handleVerifyOtp = async () => {
        try {
            await form.validateFields(['otp'])
            const otp = form.getFieldValue('otp')
            const email = form.getFieldValue('email')

            message.success('OTP verifed!')


            setTimeout(() => {
                navigate('/reset-password')
                setOtpSent(false)
                setExpired(false)
            }, 500);

        } catch {

        }
    }



    return (
        <div className='bg-white min-h-dvh font-inter flex flex-col items-center'>
            <div className='h-auto my-auto flex flex-col py-5 px-4 gap-2.5'>

                <div className='flex items-center gap-3'>
                    <div className='border border-gray-700 rounded-lg p-1'>
                        <KeyOutlined className='text-4xl align-middle!' />
                    </div>
                    <span className='text-[32px] font-bold mt-4'>Forgot Password</span>
                </div>

                <Form
                    form={form}
                    layout='vertical'
                    requiredMark={customRequiredMark}
                    className='w-full'
                >

                    {/* Email Form Field */}
                    <FormField label='Email' name='email' type='email' placeholder='Enter your email'
                        rules={emailRules} />

                    {!otpSent &&
                        <Button type='primary' block onClick={handleGetOtp}>
                            Get OTP
                        </Button>}

                    {otpSent && (
                        <>
                            <Form.Item label='Enter OTP' name='otp'
                                rules={[
                                    { required: true, message: 'OTP is required' },
                                    { pattern: /^[0-9]+$/, message: 'Only numbers is allowed' },
                                    { len: 4, message: 'Enter all 4 digits' }
                                ]}
                            >
                                <Input.OTP length={4} disabled={expired} />
                            </Form.Item>

                            {/* Countdown / Expiry Status */}
                            <div className='flex justify-between items-center mb-3 text-sm'>
                                {expired ? <span className='text-red-500 font-medium'>OTP Expired</span>
                                    : <span className='text-gray-700'>
                                        Code expires in {' '}<span className='font-semibold text-[#164c63]'>
                                            {formatTime(timeLeft)}
                                        </span>
                                    </span>}

                                <span onClick={handleGetOtp} className='text-[#164c63] hover:text-[#2a6d8a] transition-colors duration-300 cursor-pointer
                                font-medium'>Resent OTP</span>
                            </div>

                            <Button type='primary' block disabled={expired} onClick={handleVerifyOtp}>
                                Verify OTP
                            </Button>

                        </>
                    )}


                </Form>

                <div onClick={() => navigate('/signin')} className='flex self-center cursor-pointer text-[#164c63] hover:text-[#2a6d8a] transition-colors duration-300 items-center gap-2'>
                    <ArrowLeftOutlined className='text-xl align-middle!' />
                    <span className='text-[15px]  font-semibold'>Back to log in</span>

                </div>
            </div>

            <Copyright />
        </div>
    )
}

export default ForgetPassword
