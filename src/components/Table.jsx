import React from 'react'
import { Grid, Table } from 'antd'

const ReusableTable = ({ columns, data, rowKey='key', pagination = false, ...rest}) => {
  const screens = Grid.useBreakpoint()
  const mobileView = !screens.md
  return (
    
    <Table 
      columns={columns}
      dataSource={data}
      rowKey={rowKey}
      pagination={pagination}
      tableLayout={mobileView ? 'auto': 'fixed'}
      {...rest}
      
    />
  )
}

export default ReusableTable
