import React, { useEffect, useState } from 'react'
import { pageLimit } from '../utils/KeyValues'
import ReusableButton from './ReusableButton'
import { DatePicker, Input, Select } from 'antd'

const TransactionFilters = ({ searchQuery = '', startDate, endDate, handleChanges, limit }) => {
    const [searchInput, setSearchInput] = useState(searchQuery)

    useEffect(() => {
        setSearchInput(searchQuery)
    }, [searchQuery])

    const handleSearch = () => {
        handleChanges('Search', searchInput)
    }

    return (
        <div className='flex flex-row max-[500px]:flex-col md:ml-2 items-center gap-2'>

            <div className='w-full min-w-0 sm:basis-1/2 grid grid-cols-2 gap-2 max-[500px]:w-full'>
                <Input.Search
                    placeholder='Search here..'
                    size='small'
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onSearch={handleSearch}
                    allowClear
                    className='w-full rounded-md border border-slate-300 bg-white text-sm shadow-none focus:!outline-none focus:!ring-0'
                    style={{ boxShadow: 'none' }}
                />

                <Select
                    size='small'
                    optionFilterProp='label'
                    value={limit}
                    className='w-full rounded-md border border-slate-300 bg-white text-sm shadow-none focus:!outline-none focus:!ring-0'
                    onChange={(value) => handleChanges('RecordsPerPage', value)}
                    options={pageLimit}
                    style={{ boxShadow: 'none' }}
                />

            </div>

            <div className='w-full min-w-0 sm:basis-1/2 grid grid-cols-2 gap-2  max-[500px]:w-full'>
                <DatePicker
                    placeholder='Start Date'
                    size='small'
                    value={startDate}
                    onChange={(date) => handleChanges('StartDate', date)}
                    disabledDate={(current) => endDate ? current.isAfter(endDate, 'day') : false}
                    popupClassName='small-date-picker-popup'
                    className='w-full rounded-md border border-slate-300 bg-white text-sm shadow-none focus:!outline-none focus:!ring-0'
                    style={{ boxShadow: 'none' }}
                />
                <DatePicker
                    placeholder='End Date'
                    size='small'
                    value={endDate}
                    onChange={(date) => handleChanges('EndDate', date)}
                    disabledDate={(current) => startDate ? current.isBefore(startDate, 'day') : false}
                    popupClassName='small-date-picker-popup'
                    className='w-full rounded-md border border-slate-300 bg-white text-sm shadow-none focus:!outline-none focus:!ring-0'
                    style={{ boxShadow: 'none' }}
                />
            </div>


            {/* <ReusableButton
                    type='primary'
                    htmlType='button'
                    content='Search'
                    onClick={handleSearch}
                    style='h-7.5 px-3 text-sm shadow-none'
                /> */}

        </div>
    )
}

export default TransactionFilters
