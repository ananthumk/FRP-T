import React from 'react'
import { Table } from 'antd'

const ReusableTable = ({ columns, data, rowKey='key', pagination = false, ...rest}) => {
  return (
    
    <Table 
      columns={columns}
      dataSource={data}
      rowKey={rowKey}
      pagination={pagination}
      {...rest}
      
    />
  )
}

export default ReusableTable
