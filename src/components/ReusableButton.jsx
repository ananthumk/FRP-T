import { Button } from 'antd'
import React from 'react'

const ReusableButton = ({ type = 'default', content, cancel = false, onClick, htmlType = 'button' }) => {
    const style = cancel
        ? 'w-auto md:w-30 !text-[#001524] !bg-transparent'
        : 'w-auto md:w-30 !text-white'

    return (
        <div>
            <Button type={cancel ? 'default' : type} htmlType={htmlType} className={style} block onClick={onClick}>
                {content}
            </Button>
        </div>
    )
}

export default ReusableButton
