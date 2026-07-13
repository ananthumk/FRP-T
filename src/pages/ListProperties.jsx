import React, { useEffect, useState } from 'react'
import { HomeOutlined, CheckOutlined, RiseOutlined, VerticalAlignMiddleOutlined } from '@ant-design/icons'
import axios from 'axios'
import Navbar from '../components/Navbar'
import StatsCard from '../components/StatsCard'
import { Button, Form, Input, Pagination, Select } from 'antd'
import ReusableTable from '../components/Table'
import PropertyFilters from '../components/PropertyFilters'
import { getPropertyList } from '../api/apiCalls'

const statsConfig = [
    { key: 'all', label: 'All Properties', icon: HomeOutlined, color: '#03071e' },
    { key: 'sales', label: 'Sales', icon: CheckOutlined, color: '#fca311' },
    { key: 'rental', label: 'Rental', icon: RiseOutlined, color: '#583101' },
    { key: 'archived', label: 'Archived', icon: VerticalAlignMiddleOutlined, color: '#70e000' },
]

const tableColumns = [
    { title: 'Address', dataIndex: 'getFormatedAddress', key: 'getFormatedAddress' },
    { title: 'Type', dataIndex: 'sPropertyType', key: 'sPropertyType' },
    { title: 'Agent', dataIndex: 'agentName', key: 'agentName' },
    { title: 'Agent Email', dataIndex: 'agentEmail', key: 'agentEmail' },
]

const ListProperties = () => {

    const [data, setData] = useState({})
    const [jText, setJText] = useState({
        "SortBy": "CreatedDate",
        "SortOrder": "Desc",
        "AgencyId": 1,
        "Search": "",
        "PropertyFor": null,
        "LoggedUserId": 2,
        "Pages": 1
    })
    const [category, setCategory] = useState('')


    const fetchData = async () => {
        try {

            const responseData = await getPropertyList(jText)
            console.log(responseData)

            const updatedResponse = {
                stats: {
                    all: responseData.object.all,
                    sales: responseData.object.sales,
                    rental: responseData.object.rental,
                    archived: responseData.object.archived,
                },

                propertyListing: responseData.object.propertyListing?.map(
                    ({ propertyId, propertyUniqueID, agencyId, agentId, agentName, agentEmail, getFormatedAddress, sPropertyType }) => ({
                        propertyId,
                        propertyUniqueID,
                        agencyId,
                        agentId,
                        agentName,
                        agentEmail,
                        getFormatedAddress,
                        sPropertyType,
                    })
                ),

                totalCount: responseData.totalCount,
            }

            setData(updatedResponse)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
        console.log(jText)
    }, [jText])

    const handleCategoryChange = (value) => {
        setJText((prev) => ({ ...prev, PropertyFor: value || null, Pages: 1 }))
    }

    const handleSearch = (value) => {
        setJText((prev) => ({ ...prev, Search: value, Pages: 1 }))
    }

    return (
        <div className='bg-white min-h-dvh w-full bg-linear-to-r from-[#F7F7F7] via-[#FFFFFF] to-[#F5F3ED]'>
            <Navbar />

            <div className='py-8 px-7'>

                <div className='flex flex-col'>
                    <h1 className='text-2xl text-[#001524] font-bold!'>Discover Properties That Match's You</h1>
                    <p className='text-[17px] text-[#495057] font-medium! md:w-[58%]'>Explore verified listings for homes, apartments, villas and commercial spaces available for sale or rent in
                        your preferred location
                    </p>
                </div>

                <div className='w-full md:w-[90%] mx-auto space-y-7'>

                    <div className='mt-8 grid grid-cols-2 md:grid-cols-4 gap-4'>
                        {statsConfig.map((stat) => (
                            <StatsCard
                                key={stat.key}
                                label={stat.label}
                                content={data?.stats?.[stat.key] ?? 0}
                                icon={stat.icon}
                                color={stat.color}
                            />
                        ))}
                    </div>

                    <PropertyFilters searchQuery={jText.Search} onSearchCommit={handleSearch} category={jText.PropertyFor || ''}
                        onCategoryChange={handleCategoryChange} />

                    <ReusableTable columns={tableColumns} data={data.propertyListing} loading={false} pagination={false} />

                    <Pagination align='center' defaultCurrent={1} total={data.totalCount || 0} showSizeChanger={false}
                        responsive showLessItems onChange={(page) => setJText((prev) => ({ ...prev, Pages: page }))} />

                </div>
            </div>

        </div>
    )
}

export default ListProperties
