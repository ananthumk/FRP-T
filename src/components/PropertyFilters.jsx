import { Input, Select } from 'antd'
import React, { useState } from 'react'

const categoryOptions = [
    { value: '', label: 'All' },
    { value: 1, label: 'Sales' },
    { value: 2, label: 'Rental' },
    { value: 3, label: 'Archived' }
]

const PropertyFilters = ({ searchQuery = '', onSearchCommit, category, onCategoryChange, limit, pageLimit, onChangeRecordsPerPage }) => {

    const [searchInput, setSearchInput] = useState(searchQuery)

    return (
        <div className='flex flex-col gap-3 md:flex-row items-center justify-between bg-transparent'>
            <Input.Search placeholder='Search here..' className='w-full md:w-[40%]'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onSearch={onSearchCommit}
                allowClear
            />

            <div className='grid grid-cols-2 w-full md:w-auto md:flex md:items-center gap-3'>
                <Select
                    optionFilterProp='label'
                    value={limit}
                    className='md:w-30'
                    onChange={onChangeRecordsPerPage}
                    options={pageLimit}
                />

                <Select
                    showSearch
                    optionFilterProp='label'
                    value={category}
                    className='md:w-30'
                    onChange={onCategoryChange}
                    options={categoryOptions}
                />
            </div>


        </div>
    )
}

export default PropertyFilters
