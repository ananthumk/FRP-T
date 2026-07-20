import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import Navbar from '../../components/Navbar'
import ReusableButton from '../../components/ReusableButton'
import { styles } from '../../utils/Styles'
import TransactionFilters from '../../components/TransactionFilters'
import { message, Pagination } from 'antd'
import useAPIhandler from '../../client/APIhandler'
import ReusableTable from '../../components/Table'
import { transactionTable } from '../../utils/KeyValues'
import { DownloadOutlined, StockOutlined, UndoOutlined } from '@ant-design/icons'

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


    const onSelectChange = (newSelectedRows) => {
        setSelectedRowKeys(newSelectedRows)
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange
    }

    const getRowClassName = (record) => {
        return selectedRowKeys.includes(record.sType) ? 'selected-custom-row' : ''
    }

    const handleReset = () => {
        setBody((prev) => ({
            ...prev,
            "RecordsPerPage": 10,
            "Search": "",
            "StartDate": null,
            "EndDate": null,
            "SortOrder": "Desc",
            "SortBy": "AuditNumber",
        }))
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

    // Filter - (Month)
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

    // Handle Sort by Column
    const handleSortChange = (pagination, filters, sorter) => {
        const sortBy = sorter.order ? sorter.field : 'AuditNumber'
        const sortOrder = sorter.order === 'ascend' ? 'Asc' : 'Desc'

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

                {/* Filter Section */}
                <div className='flex flex-col md:flex-row gap-2 items-center justify-between'>
                    {/* Filter based on month */}
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

                    {/* Filter based on search, date, page limit */}
                    <TransactionFilters searchQuery={body?.Search} startDate={body.StartDate}
                        endDate={body.EndDate} handleChanges={handleChanges} limit={body.RecordsPerPage} />
                </div>

                {/*Filter Reset Button */}
                <div className='flex justify-end'>
                    <ReusableButton type='default' content={
                        <div className={styles['icon-text']}>
                            <UndoOutlined className='text-xl align-middle' />
                            <span>Reset</span>
                        </div>
                    } onClick={handleReset} style='bg-transparent border-none outline-none p-0' />
                </div>

                {/* Table */}
                <div className='custom-table'>
                    <ReusableTable
                        columns={transactionTable}
                        data={transactionDetails?.transactionList}
                        rowKey='auditNumber'
                        rowSelection={rowSelection}
                        onChange={handleSortChange}
                        loading={loading}
                        rowClassName={getRowClassName}
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
