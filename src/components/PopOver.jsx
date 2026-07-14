import React from 'react'

const PopOver = ({ children }) => {
    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)] p-5'>
            <div className='w-full h-[90vh] overflow-y-scroll no-scrollbar max-w-xl rounded-2xl bg-white p-6 shadow-xl'>
                {children}
            </div>
        </div>
    )
}

export default PopOver
