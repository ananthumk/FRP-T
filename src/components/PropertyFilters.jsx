import { Input, Select } from 'antd'
import React, { useState } from 'react'

const categoryOptions = [
    { value: '', label: 'All' },
    { value: 'sales', label: 'Sales' },
    { value: 'rental', label: 'Rental' },
    { value: 'archived', label: 'Archived' }
]

const PropertyFilters = ({ searchQuery = '', onSearchCommit, category, onCategoryChange }) => {

    const [searchInput, setSearchInput] = useState(searchQuery)

    return (
        <div className='flex items-center justify-between bg-transparent'>
            <Input.Search placeholder='Search here..' className='w-[65%]! md:w-[40%]!'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onSearch={onSearchCommit}
                allowClear
            />

            <Select
                showSearch
                optionFilterProp='label'
                value={category}
                className='w-20 md:w-30'
                onChange={onCategoryChange}
                options={categoryOptions}
            />


        </div>
    )
}

export default PropertyFilters
