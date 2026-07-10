import React from 'react'
import { SearchOutlined, BellOutlined, UserOutlined } from '@ant-design/icons'

const Navbar = () => {
    return (
        <div className='w-full h-15 py-3.75 px-6 bg-white flex justify-between items-center border border-solid
                  border-[#ced4da]'>

            {/* Menu Top Bars */}
            <div className='flex justify-center font-inter mt-3 ml-1 font-normal items-center gap-3
             text-[#2c3e50] text-[16px]'>
                <p className='mr-8 cursor-pointer leading-4'>Sale</p>
                <p className='mr-8 cursor-pointer leading-4'>Lease</p>
                <p className='mr-8 cursor-pointer leading-4'>Job Portal</p>
            </div>

            {/* Actions */}
            <div className='flex justify-center gap-5 text-[22px]'>
                <div className='flex justify-center items-center bg-transparent hover:bg-[#f3f3f3] w-10 h-10 rounded-[50%] transiton-color duration-200'>
                    <SearchOutlined className='cursor-pointer hover:text-[#054768]!' />
                </div>
                <div className='flex justify-center items-center bg-transparent hover:bg-[#f3f3f3] w-10 h-10 rounded-[50%] transiton-color duration-200'>
                    <BellOutlined className='cursor-pointer hover:text-[#054768]!' />
                </div>
                <div className='flex justify-center items-center bg-transparent hover:bg-[#f3f3f3] w-10 h-10 rounded-[50%] transiton-color duration-200'>
                    <UserOutlined className='cursor-pointer hover:text-[#054768]!' />
                </div>
            </div>

        </div>
    )
}

export default Navbar
