import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import Navbar from '../../components/Navbar'
import ReusableButton from '../../components/ReusableButton'
import { styles } from '../../utils/Styles'
import TransactionFilters from '../../components/TransactionFilters'
import { Grid, message, Pagination } from 'antd'
import useAPIhandler from '../../client/APIhandler'
import ReusableTable from '../../components/Table'
import { transactionTable } from '../../utils/KeyValues'
import { DownloadOutlined, StockOutlined } from '@ant-design/icons'

const filterBtn = [
    { "label": "This Month", "value": "ThisMonth" },
    { "label": "Last Month", "value": "LastMonth" },
    { "label": "All", "value": "" },
]

const Transactions = () => {
    const [filter, setFilter] = useState('')
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [transactionDetails, setTransactionDetails] = useState(null)
    const [body, setBody] = useState({
        "AgencyId": 1,
        "TabId": 3,
        "PageNo": 1,
        "RecordsPerPage": 10,
        "Search": "",
        "StartDate": null,
        "EndDate": null,
        "SortOrder": "Desc",
        "SortBy": "AuditNumber",
        "Address": "",
    })
    const [loading, setLoading] = useState(true)
    const apiHanlder = useAPIhandler()

    const screens = Grid.useBreakpoint()
    const isMobile = !screens.md

    const onSelectChange = (newSelectedRows) => {
        setSelectedRowKeys(newSelectedRows)
    }

    const rowSelection = {
        selectedRowKeys, 
        onChange: onSelectChange
    }

    const getRowClassName = (record) => {
        return selectedRowKeys.includes(record.auditNumber) ? 'selected-custom-row' : ''
    }

    const fetchData = async () => {
        try {
            setLoading(true)
            const requestBody = {
                ...body,
                StartDate: body.StartDate ? body.StartDate.format('YYYY-MM-DD') : null,
                EndDate: body.EndDate ? body.EndDate.format('YYYY-MM-DD') : null,
            }
            const response = await apiHanlder('post', '/transaction/AccountLedger/gettransactionlist', requestBody)
            const updatedResponse = {
                transactionList: response?.object?.transactiondetails,
                totalCount: response?.totalCount
            }
            setTransactionDetails(updatedResponse)
            setLoading(false)
        } catch (error) {
            message.error(error?.message || 'Something went wrong! Please try again later')
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [body])

    const handleChanges = (key, value) => {
        setBody((prev) => ({
            ...prev,
            [key]: value,
            ...(key !== 'PageNo' ? { PageNo: 1 } : {}),
        }))
    }

    const handleFilterClick = (value) => {
        setFilter(value)

        if (value === 'ThisMonth') {
            setBody((prev) => ({
                ...prev,
                PageNo: 1,
                StartDate: dayjs().startOf('month'),
                EndDate: dayjs().endOf('month'),
            }))
            return
        }

        if (value === 'LastMonth') {
            setBody((prev) => ({
                ...prev,
                PageNo: 1,
                StartDate: dayjs().subtract(1, 'month').startOf('month'),
                EndDate: dayjs().subtract(1, 'month').endOf('month'),
            }))
            return
        }

        setBody((prev) => ({
            ...prev,
            PageNo: 1,
            StartDate: null,
            EndDate: null,
        }))
    }

    const handleSortChange = (pagination, filters, sorter) => {
        const sortBy = sorter.order ? sorter.field : 'AuditNumber'
        const sortOrder = sorter.order === 'ascend'? 'Asc' : 'Desc'

         setBody((prev) => ({
            ...prev,
            SortBy: sortBy,
            SortOrder: sortOrder,
            PageNo: 1,
        }))
    }

    return (
        <div className='bg-white font-inter min-h-dvh w-full bg-linear-to-r from-[#F7F7F7] via-[#FFFFFF] to-[#F5F3ED]'>
            <Navbar />

            <div className='py-8 px-7 space-y-4'>

                <div className='flex items-center justify-between'>
                   
                        <h1 className='text-2xl font-bold'>Transactions</h1>
                      
                    
                    <ReusableButton type='default' htmlType='button' content={
                        <div className='flex items-center gap-1'>
                            <DownloadOutlined className='text-lg align-middle' />
                            <span className='text-md hidden md:block font-medium'>Export</span>
                        </div>
                    } />
                </div>

                <div className='flex flex-col md:flex-row gap-2 items-center justify-between'>
                    <div className={`${styles['icon-text']} h-9 w-full justify-between md:w-auto bg-white rounded-2xl`}>
                        {filterBtn.map((text) => (
                            <ReusableButton
                                key={text.value}
                                type='default'
                                htmlType='button'
                                content={text.label}
                                style={filter !== text.value ? styles['t-btn'] : styles['t-btn-active']}
                                onClick={() => handleFilterClick(text.value)}
                            />
                        ))}
                    </div>

                    <TransactionFilters searchQuery={body?.Search} StartDate={body.StartDate}
                    endDate={body.EndDate} handleChanges={handleChanges} limit={body.RecordsPerPage} />
                </div>



                <div className='custom-table'>
                    <ReusableTable
                        columns={transactionTable}
                        data={transactionDetails?.transactionList}
                        rowKey='auditNumber'
                        rowSelection={rowSelection}
                        onChange={handleSortChange}
                        loading={loading}
                        rowClassName={getRowClassName}
                        tableLayout={isMobile? 'auto': 'fixed'}
                    />
                </div>

                <Pagination
                    current={body.PageNo}
                    align='center'
                    total={transactionDetails?.totalCount || 0}
                    showSizeChanger={false}
                    pageSize={body?.RecordsPerPage}
                    showLessItems
                    onChange={(page) => handleChanges('PageNo', page)}
                />
            </div>
        </div>
    )
}

export default Transactions
