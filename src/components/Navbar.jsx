import React from 'react'

const Navbar = () => {
    return (
        <div className='w-full h-15 py-3.75 px-3.75 bg-white flex justify-between items-center border border-solid
                  border-[#ced4da]'>

            {/* Menu Top Bars */}
            <div className='flex justify-center font-inter ml-1 font-semibold items-center gap-3 text-[#2c3e50] text-[14px]'>
                <p className='mr-8 cursor-pointer leading-4'>Sale</p>
                <p className='mr-8 cursor-pointer leading-4'>Lease</p>
                <p className='mr-8 cursor-pointer leading-4'>Job Portal</p>
            </div>

            {/* Actions */}
            <div>
               
            </div>

        </div>
    )
}

export default Navbar
