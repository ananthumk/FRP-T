import {
  DatabaseFilled,
  LogoutOutlined,
  MenuOutlined,
  SettingOutlined,
  SwapOutlined,
} from '@ant-design/icons'
import { Divider, Drawer, Grid, Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const { useBreakpoint } = Grid

const items = [
  {
    key: '1',
    label: 'PROPERTY',
    children: [{ key: '11', icon: <DatabaseFilled className='text-black' />, label: 'Properties' }],
  },
  {
    key: '2',
    label: 'ACCOUNTS',
    children: [{ key: '21', icon: <SwapOutlined />, label: 'Transactions' }],
  },
]

const footerItems = [
  { key: 'settings', icon: <SettingOutlined />, label: 'Settings' },
  { key: 'logout', icon: <LogoutOutlined />, label: 'Logout' },
]

const getLevelKeys = (items1) => {
  const key = {}
  const func = (items2, level = 1) => {
    items2.forEach((item) => {
      if (item.key) key[item.key] = level
      if (item.children) func(item.children, level + 1)
    })
  }
  func(items1)
  return key
}

const levelKeys = getLevelKeys(items)

const Sidebar = () => {
  const [stateOpenKeys, setStateOpenKeys] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  const location = useLocation()

  const navigate = useNavigate()
  const screens = useBreakpoint()
  const isMobile = !screens.lg
 
  const path = location.pathname

  useEffect(() => {
    if (path === '/list-property') setStateOpenKeys(['1', '11'])
    if (path === '/transactions') setStateOpenKeys(['2', '21'])
  }, [location])

  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find((key) => !stateOpenKeys.includes(key))
  
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey])
      setStateOpenKeys(
        openKeys
          .filter((_, index) => index !== repeatIndex)
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      )
    } else {
      setStateOpenKeys(openKeys)
    }
  }

  const handleMenuClick = ({ key }) => {
    if (key === '11') navigate('/list-property')
    if (key === '21') navigate('/transactions')
    if (isMobile) setMobileOpen(false)
  }

  const SidebarContent = (
    <div className='flex h-full w-full flex-col lg:w-65 space-y-5 overflow-hidden 
    bg-[#F1F6F8] px-4 py-10 border-gray-200 border-r'>
      <div className='flex items-center justify-center gap-2 px-2'>
        <img
          src={`${import.meta.env.VITE_API_IMG_URL}/assets/images/mainLogo.png`}
          className='w-12 h-15 md:w-20 md:h-16 object-contain'
          alt='company-logo'
        />
        <span className='text-[19px] font-semibold'>Foreal Estate</span>
      </div>

      <Menu
        mode='inline'
        defaultSelectedKeys={['11']}
        openKeys={stateOpenKeys}
        selectedKeys={stateOpenKeys}
        onOpenChange={onOpenChange}
        onClick={handleMenuClick}
        items={items}
        className='flex-1 bg-transparent overflow-y-auto border-none'
      />

      <Divider className='my-0 text-black' />

      <Menu selectable={false} mode='inline' items={footerItems}
       onClick={handleMenuClick} className='border-none bg-transparent' />
    </div>
  )

  if (!isMobile) {
    return (
      <div className='fixed left-0 top-0 h-screen w-50 border-r border-slate-200 shadow-sm'>
        {SidebarContent}
      </div>
    )
  }

  return (
    <>
      <button
        type='button'
        onClick={() => setMobileOpen(true)}
        className='fixed left-2 top-3 z-40 flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-[#fff] shadow-sm'
        aria-label='Open menu'
      >
        <MenuOutlined className='text-md' />
      </button>

      <Drawer
        placement='left'
        onClose={() => setMobileOpen(false)}
        open={mobileOpen}
        width={260}
        styles={{ body: { padding: 0 } }}
        getContainer={() => document.getElementById('root')}
      >
        {SidebarContent}
      </Drawer>
    </>
  )
}

export default Sidebar