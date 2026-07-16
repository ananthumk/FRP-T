import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider, App as AntdApp } from 'antd'
import 'antd/dist/reset.css'
import "@fontsource/outfit"
import "@fontsource/inter"
import './index.css'
import App from './App.jsx'
import theme from './theme/theme.js'
import { StyleProvider } from '@ant-design/cssinjs'
import { AuthProvider } from './context/ContextAPI.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StyleProvider>
      <ConfigProvider theme={theme} wave={{ disabled: true }}>
        <AntdApp>
          <BrowserRouter>
            <AuthProvider>
              <App />
            </AuthProvider>
          </BrowserRouter>
        </AntdApp>
      </ConfigProvider>
    </StyleProvider>
  </StrictMode >
)
