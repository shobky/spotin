import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import AddItem from './pages/addItem/AddItem'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Cashier from './pages/cashier/Cashier'
import Dashboard from './pages/dashboard/Dashboard'

const App = () => {
  return (
    <div className='app'>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />

        <Route path='/admin/dashboard/items/add' element={<AddItem />} />

        <Route path='/admin/cashier' element={<CartProvider><Cashier /></CartProvider>} />

        <Route path='/admin/dashboard' element={
          <AuthProvider>
            <Dashboard />
          </AuthProvider>
        } />
      </Routes>
    </div >
  )
}

export default App