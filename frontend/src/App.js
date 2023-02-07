import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Dashboard from './pages/dashboard/Dashboard'

const App = () => {
  return (
    <div className='app'>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={
          <AuthProvider>
            <Dashboard />
          </AuthProvider>
        } />
      </Routes>
    </div>
  )
}

export default App