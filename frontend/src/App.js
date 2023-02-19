import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import { ItemsProvider } from './contexts/ItemsContext'
import { OrderProvider } from './contexts/OrderContext'
import AddItem from './pages/addItem/AddItem'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Cashier from './pages/cashier/Cashier'
import Dashboard from './pages/dashboard/Dashboard'
import Orders from './pages/orders/Orders'

const App = () => {
  return (
    <div className='app'>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />

        <Route path='/admin/dashboard/items/add' element={<AddItem />} />

        <Route path='/admin/dashboard' element={
          <AuthProvider>
            <Dashboard />
          </AuthProvider>
        } />
           <Route path='/admin/cashier' element={
          <ItemsProvider>
            <OrderProvider>
              <CartProvider>
                <Cashier />
              </CartProvider>
            </OrderProvider>
          </ItemsProvider>
        } />

        <Route path='/admin/orders' element={
           <ItemsProvider>
           <OrderProvider>
             <CartProvider>
               <Orders />
             </CartProvider>
           </OrderProvider>
         </ItemsProvider>
        } />
      </Routes>

    </div >
  )
}

export default App