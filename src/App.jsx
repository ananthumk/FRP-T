import LoginPage from './pages/Account/LoginPage'
import { Route, Routes } from 'react-router-dom'
import SignupPage from './pages/Account/Signup'
import './App.css'
import ForgetPassword from './pages/Account/ForgetPassword'
import ResetPassword from './pages/Account/ResetPassword'
import ListProperties from './pages/ListProperties'

function App() {

  return (
   <div className=''>
      <Routes>
        <Route path='/signin' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/forgot-password' element={<ForgetPassword />} />
        <Route path='reset-password' element={<ResetPassword />} />
        <Route path='/list-property' element={<ListProperties />} />
      </Routes>
   </div>
  )
}

export default App
