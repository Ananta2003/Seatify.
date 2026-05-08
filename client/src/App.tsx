import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Hero from './pages/Hero'
import Dashboard from './pages/Dashboard'
import Checkout from './pages/Checkout'
import AdminDashboard from './pages/AdminDashboard'
import { UserSignin, UserSignup } from './pages/User-Signin'
import { AdminSignin, AdminSignup } from './pages/Admin'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Hero />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/admin-dashboard' element={<AdminDashboard />} />
          <Route path='/user-signup' element={<UserSignup />} />
          <Route path='/user-signin' element={<UserSignin />} />
          <Route path='/admin-signup' element={<AdminSignup />} />
          <Route path='/admin-signin' element={<AdminSignin />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
