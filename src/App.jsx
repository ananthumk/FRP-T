import LoginPage from './pages/LoginPage'
import { Route, Routes } from 'react-router-dom'
import SignupPage from './pages/Signup'
import HomePage from './pages/Home'
import './App.css'

function App() {

  return (
   <div className=''>
      <Routes>
        <Route path='/signin' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/home' element={<HomePage />} />
      </Routes>
   </div>
  )
}

export default App
