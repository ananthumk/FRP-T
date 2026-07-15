import { Button } from 'antd'
import React from 'react'

const ReusableButton = ({ type = 'default', content, style, onClick, htmlType = 'button' }) => {
    return (
        <div>
            <Button
                type={type}
                htmlType={htmlType}
                className={style}
                block
                onClick={onClick}
                
            >
                {content}
            </Button>
        </div>
    )
}

export default ReusableButton
