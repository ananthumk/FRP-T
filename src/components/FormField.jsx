import React from 'react'
import { Form, Input} from 'antd'

const FormField = ({  name, label, type = 'text', placeholder, rules }) => {
    const InputComponent = type === 'password' ? Input.Password : Input 

    return (
        <Form.Item
           label={label}
           name={name}
           validateTrigger={['onBlur']}
           rules={rules}
        >
             <InputComponent type={type === 'password' ? undefined : type} placeholder={placeholder} />
        </Form.Item>
    )
}

export default FormField