import React from 'react'
import { SearchOutlined, BellOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons'
import { Button, Popover } from 'antd'
import { useNavigate } from 'react-router-dom'
import { styles } from '../utils/Styles'


const Navbar = () => {
    
    const navigate = useNavigate()

    const handleLogout = () => {
        setTimeout(() => {
            navigate('/signin')
        }, 500);
    }
    
    const userPopupContent = () => (
        <div className='flex flex-col min-w-30'>
           <Button type='text' icon={<LogoutOutlined />} onClick={handleLogout} 
           className='text-black justify-start hover:text-[#054768] hover:bg-[#e1e1e1]' block>
            Logout
           </Button>
        </div>
    )

    return (
        <div className='w-full h-15 py-3.75 px-6 bg-transparent flex justify-between items-center border border-solid
                  border-[#ced4da]'>

            {/* Menu Top Bars */}
            <div className='flex justify-center font-inter mt-3 md:ml-1 font-normal items-center gap-3
             text-[#2c3e50] text-[14px] md:text-[16px]'>
                <p className={styles['navbar-menu']}>Sale</p>
                <p className={styles['navbar-menu']}>Lease</p>
                <p className={styles['navbar-menu']}>Job Portal</p>
            </div>

            {/* Actions */}
            <div className='flex justify-center md:gap-5 text-[20px] md:text-[22px]'>
                <div className={styles['navbar-action-div']}>
                    <SearchOutlined className={styles['navbar-action-icon']} />
                </div>
                <div className={styles['navbar-action-div']}>
                    <BellOutlined className={styles['navbar-action-icon']} />
                </div>

                <Popover content={userPopupContent} trigger='hover' placement='bottom' arrow={{pointAtCenter: true}}
                color='#ffffff'>
 
                <div className={styles['navbar-action-div']}>
                    <UserOutlined className={styles['navbar-action-icon']} />
                </div>

                </Popover>
            </div>

        </div>
    )
}

export default Navbar
