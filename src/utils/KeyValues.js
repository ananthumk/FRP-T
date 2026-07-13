import { HomeOutlined, CheckOutlined, RiseOutlined, VerticalAlignMiddleOutlined } from '@ant-design/icons'

// List Property
export const statsConfig = [
    { key: 'all', label: 'All Properties', icon: HomeOutlined, color: '#03071e' },
    { key: 'sales', label: 'Sales', icon: CheckOutlined, color: '#fca311' },
    { key: 'rental', label: 'Rental', icon: RiseOutlined, color: '#583101' },
    { key: 'archived', label: 'Archived', icon: VerticalAlignMiddleOutlined, color: '#70e000' },
]

export const tableColumns = [
    { title: 'Address', dataIndex: 'getFormatedAddress', key: 'getFormatedAddress' },
    { title: 'Type', dataIndex: 'sPropertyType', key: 'sPropertyType' },
    { title: 'Agent', dataIndex: 'agentName', key: 'agentName' },
    { title: 'Agent Email', dataIndex: 'agentEmail', key: 'agentEmail' },
]

export const pageLimit = [
    { value: 10, label: '10 Pages'},
    { value: 20, label: '20 Pages'},
    { value: 50, label: '50 Pages'},
    { value: 100, label: '100 Pages'},
]
 
// --------------------