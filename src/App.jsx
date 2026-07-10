import LoginPage from './pages/LoginPage'
import { Route, Routes } from 'react-router-dom'
import SignupPage from './pages/Signup'
import HomePage from './pages/Home'
import './App.css'
import ForgetPassword from './pages/ForgetPassword'
import ResetPassword from './pages/ResetPassword'

function App() {

  return (
   <div className=''>
      <Routes>
        <Route path='/signin' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/forgot-password' element={<ForgetPassword />} />
        <Route path='reset-password' element={<ResetPassword />} />
      </Routes>
   </div>
  )
}

export default App
