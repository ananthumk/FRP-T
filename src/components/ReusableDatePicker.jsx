import { DatePicker } from 'antd'
import React from 'react'

const ReusableDatePicker = ({ placeholder, value, name, dValue, handleChanges, condition }) => {
    return (
        <DatePicker
            placeholder={placeholder}
            size='small'
            value={value}
            onChange={(date) => handleChanges(name, date)}
            disabledDate={(current) => dValue ? current[condition](dValue, 'day') : false}
            className='h-9! text-base! w-full'
            style={{ boxShadow: 'none' }}
        />
    )
}

export default ReusableDatePicker
