import LoginPage from './pages/Account/LoginPage'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignupPage from './pages/Account/Signup'
import './App.css'
import ForgetPassword from './pages/Account/ForgetPassword'
import ResetPassword from './pages/Account/ResetPassword'
import ListProperties from './pages/Property/ListProperties'
import ProtectedRoute from './components/Routing/ProtectedRoute'
import PublicRoute from './components/Routing/PublicRoute'

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
        <Route path='reset-password' element={<ResetPassword />} />

        <Route path='/list-property' element={
          <ProtectedRoute>
            <ListProperties />
          </ProtectedRoute>
        } />

        <Route path='*' element={<Navigate to='/signin' replace />} />
      </Routes>
   </div>
  )
}

export default App
