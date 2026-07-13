import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { SearchOutlined } from '@ant-design/icons'
import { Button } from 'antd'

const statsSection = [
  {id: 1, number: 1, content: 'Locations'},
  {id: 1, number: '4K+', content: 'Happy Customers'},
  {id: 1, number: '500+', content: 'Property Listing'},
]

const HomePage = () => {
  const [mode, setMode] = useState('buy')

  return (
    <div className=''>
      <Navbar />
      <div className='py-5 relative px-6'>
        <div className='banner-section rounded-[20px]'>
          <div className='banner-overlay'></div>

          <div className='banner-card '>
            {/* Tabs */}
            <div className='bg-white inline-flex items-center gap-6 border-b border-slate-100 px-6 pt-5 rounded-t-[10px]'>
              <button
                type='button'
                onClick={() => setMode('buy')}
                className={`pb-3 text-[15px] w-20 font-semibold transition-colors duration-300 ${mode === 'buy'
                  ? 'border-b-2 border-blue-600 text-blue-600!'
                  : 'border-b-2 border-transparent text-slate-500 hover:text-slate-800'
                  }`}
              >
                Buy
              </button>
              <button
                type='button'
                onClick={() => setMode('lease')}
                className={`pb-3 text-[15px] w-20 font-semibold transition-colors  duration-300 ${mode === 'lease'
                  ? 'border-b-2 border-blue-600 text-blue-600!'
                  : 'border-b-2 border-transparent text-slate-500 hover:text-slate-800'
                  }`}
              >
                Lease
              </button>
            </div>

            {/* Search row */}
            <div className='bg-white flex items-center gap-2 px-4 py-4 rounded-tr-[10px] rounded-b-[10px] w-full'>
              <div className='flex flex-1 min-w-0 items-center gap-2 rounded-md border border-slate-200 px-4 py-3'>
                <SearchOutlined className='shrink-0 text-slate-400' />
                <input
                  type='text'
                  placeholder='Search suburb or postcode'
                  className='w-full min-w-0 border-none bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400'
                />
              </div>

              <div className='flex shrink-0 items-center gap-1 rounded-md border border-slate-200 px-4 py-3'>
                <select className='bg-transparent text-sm text-slate-700 outline-none'>
                  <option>Beds</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4+</option>
                </select>
              </div>

              <div className='flex shrink-0 items-center gap-1 rounded-md border border-slate-200 px-4 py-3'>
                <select className='bg-transparent text-sm text-slate-700 outline-none'>
                  <option>$50,000 - $100,000</option>
                  <option>$100,000 - $250,000</option>
                  <option>$250,000 - $500,000</option>
                  <option>$500,000+</option>
                </select>
              </div>

              <Button
                type='primary'
                className='shrink-0 rounded-full bg-[#3d6b82]! px-6 py-2 text-sm font-semibold text-white hover:bg-[#345a6e]!'
              >
                Search
              </Button>
            </div>
          </div>

          <div className='absolute bottom-0 right-0 z-50 h-15 w-[47%] rounded-tl-lg bg-white'></div>
        </div>
      </div>

      <div className='fixed bottom-16 z-100 right-5 py-1.5 w-138 rounded-md bg-white shadow-2xl
       shadow-[rgba(0,0,0,0.5)] flex justify-evenly items-center'>
          
          {statsSection.map(value => (
             <div className='flex flex-col items-center'>
            <h2 className='text-2xl font-extrabold!'>{value.number}</h2>
            <p className='text-md font-medium'>{value.content}</p>
          </div>
          ))}

      </div>

    </div>
  )
}

export default HomePage