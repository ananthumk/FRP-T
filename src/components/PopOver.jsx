import React from 'react'

const PopOver = ({ children }) => {
    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)] p-5'>
            {children}
        </div>
    )
}

export default PopOver
