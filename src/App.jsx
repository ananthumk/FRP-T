import LoginPage from './pages/Auth/LoginPage'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignupPage from './pages/Auth/Signup'
import './App.css'
import ForgetPassword from './pages/Auth/ForgetPassword'
import ResetPassword from './pages/Auth/ResetPassword'
import ListProperties from './pages/Property/ListProperties'
import ProtectedRoute from './components/Routing/ProtectedRoute'
import PublicRoute from './components/Routing/PublicRoute'
import Transactions from './pages/Accounts/Transactions'

function App() {

  return (
   <div className=''>
      <Routes>

        <Route path='/signin' element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } />

        <Route path='/signup' element={
          <PublicRoute>
            <SignupPage />
          </PublicRoute>
        } />

        <Route path='/forgot-password' element={<ForgetPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />

        <Route element={<ProtectedRoute />}>
          <Route path='/list-property' element={<ListProperties />} />
          <Route path='/transactions' element={<Transactions />} />
        </Route>

        <Route path='*' element={<Navigate to='/signin' replace />} />
      </Routes>
   </div>
  )
}

export default App
