import { Button, DatePicker, Form } from 'antd'
import React, { useState } from 'react'
import { customRequiredMark } from '../../utils/RequiredMark'
import FormField from '../FormField'
import { routineInspectionFrequencyRules } from '../../utils/schema'
import PopOver from '../PopOver'
import ReusableButton from '../ReusableButton'
import { styles } from '../../utils/Styles'
import { BookOutlined } from '@ant-design/icons'

const FrequencyPopup = ({ onClose, onSave }) => {
    const [form] = Form.useForm()
    const [selectedDate, setSelectedDate] = useState('')

    const handleFinish = (values) => {
        const formattedValues = {
            ...values,
            LastInspectionDate: selectedDate,
        }

        if (typeof onSave === 'function') onSave(formattedValues)
        if (typeof onClose === 'function') onClose()
    }

    return (
        <PopOver>
            <div className='w-[90%] sm:w-[60%] md:w-[45%] lg:w-[38%] xl:w-[30%] space-y-3 h-auto my-auto overflow-y-scroll no-scrollbar max-w-xl rounded-2xl bg-white p-6 shadow-xl'>
                
                {/* Sub heading */}
                <div className='flex items-center justify-between'>
                    <div className={styles['icon-text']}>
                        <div className='p-2 rounded-lg bg-[#a7c957]'>
                            <BookOutlined className='text-2xl text-[#386641] align-middle!' />
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-[17.5px] md:text-[20px] font-semibold leading-7 text-[#001524]'>Rental Inspection</span>
                            <span className='text-[10px] md:text-sm leading-4'>Schedule Your monthly inspection for this rental property</span>
                        </div>
                    </div>
                    <Button type='text' onClick={onClose}>
                        ✕
                    </Button>
                </div>

                {/* Form */}
                <Form form={form} layout='vertical' className='w-full ' requiredMark={customRequiredMark}
                    onFinish={handleFinish}>

                    <FormField label='Routine Inspection Frequency' name='RoutineInspectionFrequency' rules={routineInspectionFrequencyRules} />

                    <Form.Item label='Last Inspection Date' name='LastInspectionDate' rules={[{
                        required: true, message: 'Last Inspection Date is required'
                    }]}
                    >
                        <DatePicker
                            format='DD/MM/YYYY'
                            onChange={(date, dateString) => {
                                setSelectedDate(dateString)
                            }}
                        />
                    </Form.Item>

                    {/* button */}
                    <div className='flex justify-between items-center gap-2'>
                        <ReusableButton content='Cancel' style={styles['normal-btn']} onClick={onClose} />
                        <ReusableButton type='primary' style={styles['primary-btn']} htmlType='submit' content='Save Inspection' />
                    </div>
                </Form>
            </div>
        </PopOver>
    )
}

export default FrequencyPopup
