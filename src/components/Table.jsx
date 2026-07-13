import React from 'react'
import { Table } from 'antd'

const ReusableTable = ({ columns, data, rowKey='key', ...rest}) => {
  return (
    
    <Table 
      columns={columns}
      dataSource={data}
      rowKey={rowKey}
      scroll={{ x: 'max-content'}}
      {...rest}
    />
  )
}

export default ReusableTable
