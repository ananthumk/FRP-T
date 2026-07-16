import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../../components/Navbar'
import StatsCard from '../../components/StatsCard'
import { Button, Form, Input, Pagination, Select } from 'antd'
import ReusableTable from '../../components/Table'
import PropertyFilters from '../../components/PropertyFilters'
import APIhandler from '../../client/APIhandler'
import { pageLimit, statsConfig, tableColumns } from '../../utils/KeyValues'
import ReusableButton from '../../components/ReusableButton'
import AddProperty from '../../components/Popup/AddProperty'
import { PlusOutlined } from '@ant-design/icons'
import { styles } from '../../utils/Styles'
import { useAuth } from '../../context/ContextAPI'


const ListProperties = () => {

    const [data, setData] = useState({})
    const [jText, setJText] = useState({
        "SortBy": "CreatedDate",
        "SortOrder": "Desc",
        "AgencyId": null,
        "RecordsPerPage": 10,
        "Search": "",
        "PropertyFor": null,
        "LoggedUserId": null,
        "PageNo": 1
    })
    const [category, setCategory] = useState('')
    const [loading, setLoading] = useState(true)
    const [popOver, setPopOver] = useState(false)

    const { agencyId, loggedUserId } = useAuth()

    // Fetching Properties List
    const fetchData = async () => {
        setLoading(true)
        try {

            const responseData = await APIhandler('post', '/property/getpropertylist', jText)

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
            setLoading(false)

        } catch (error) {
            setLoading(false)
        }
    }

    useEffect(() => {
        setJText((prev) => ({ ...prev, ['AgencyId']: agencyId, ['LoggedUserId']: loggedUserId }))
    }, [agencyId, loggedUserId])

    useEffect(() => {
        fetchData()
    }, [jText])

    const handleCategoryChange = (value) => {
        setJText((prev) => ({ ...prev, PropertyFor: value || null, PageNo: 1 }))
    }

    // handling search functionality
    const handleSearch = (value) => {
        setJText((prev) => ({ ...prev, Search: value, PageNo: 1 }))
    }

    const handleRecordsPerPage = (value) => {
        setJText((prev) => ({ ...prev, RecordsPerPage: value }))
    }

    const handleAddProperty = () => {
        setPopOver(true)
    }

    return (
        <div className='bg-white font-inter min-h-dvh w-full bg-linear-to-r from-[#F7F7F7] via-[#FFFFFF] to-[#F5F3ED]'>
            <Navbar />

            <div className='py-8 px-7'>

                <div className='flex justify-between'>

                    <div className='flex flex-col'>
                        <h1 className='text-2xl text-[#001524] font-bold'>Discover Properties That Match's You</h1>
                        <p className='text-[17px] text-[#495057] font-medium md:w-[58%]'>Explore verified listings for homes, apartments, villas and commercial spaces available for sale or rent in
                            your preferred location
                        </p>
                    </div>

                    <ReusableButton type='primary' style={styles['primary-btn']} onClick={handleAddProperty} content={
                        <>
                            <span className='md:hidden'><PlusOutlined /></span>
                            <span className='hidden md:inline'>Add Property</span>
                        </>
                    } />

                </div>

                {popOver && <AddProperty onClose={() => setPopOver(false)} />}

                <div className='w-full md:w-[90%] mx-auto space-y-7'>

                    {/* Stats Card */}
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

                    {/* Filtering Tabs */}
                    <PropertyFilters searchQuery={jText.Search} onSearchCommit={handleSearch} category={jText.PropertyFor || ''}
                        onCategoryChange={handleCategoryChange} limit={jText.RecordsPerPage || 10} pageLimit={pageLimit}
                        onChangeRecordsPerPage={handleRecordsPerPage} />

                    {/* Table */}
                    <ReusableTable columns={tableColumns} data={data.propertyListing} loading={loading} pagination={false} />

                    {/* Pagination */}
                    <Pagination align='center' defaultCurrent={1} total={data.totalCount || 0} showSizeChanger={false}
                        pageSize={jText.RecordsPerPage} responsive showLessItems onChange={(page) => setJText((prev) => ({ ...prev, PageNo: page }))} />

                </div>
            </div>

        </div>
    )
}

export default ListProperties
