
const theme = {
    token: {
       fontFamily: "'Inter', sans-serif",
       fontSize: 15,
       colorText: '#1e293b',
       colorTextSecondary: '#4b5563',

       colorPrimary: '#164c63',
       colorPrimaryHover: '#2a6d8a',
       colorPrimaryActive: '#0d384a',

       borderRadius: 8,
       controlHeight: 44,

       colorBorder: '#cbd5e1',
       colorBorderSecondary: '#e2e8f0'
    },

    components: {
        Button: {
            colorPrimaryHover:'#2a6d8a',
            fontWeight: 500
        },
        Input: {
            hoverBorderColor: '#164c63',
            activeBorderColor: '#164c63',
            fontFamily: "'Outfit', sans-serif"
        },
        Checkbox: {
            colorPrimary: '#164c63'
        },
        Menu: {
            itemSelectedBg: '#dad7cd',
            itemSelectedColor: '#023047',
            itemColor: '#6d6875'
        },
        Drawer: {
            colorBgElevated: '#F1F6F8'
        }
    }
}

export default theme