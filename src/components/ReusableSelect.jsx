import { Form, Select } from 'antd'
import React from 'react'
import { customRequiredMark } from '../utils/RequiredMark'

const ReusableSelect = ({ label, name, placeholder, options = [], rules, loading = false }) => {
    return (
        <Form.Item label={label} name={name} rules={rules} required={customRequiredMark}>
            <Select placeholder={placeholder} options={options} loading={loading} />
        </Form.Item>
    )
}

export default ReusableSelect
