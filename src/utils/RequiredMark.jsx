import React from 'react'

export const customRequiredMark = (labelNode, { required }) => (
    <span>
        {labelNode}
        {required && <span className='text-red-500 ml-1'>*</span>}
    </span>
)
