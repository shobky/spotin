import React from 'react'
import Logo from '../../Logo'
import { MdOutlineSpaceDashboard } from 'react-icons/md'
import './nav.css'
import { AiOutlineShop } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useOrder } from '../../../contexts/OrderContext'
const Nav = () => {
    const { onSearchOrders } = useOrder()

    return (
        <nav className='orders_nav'>
            <h1 style={{ fontFamily: 'monBold' }}>Orders</h1>
            <Link className='orders_nav-link' to={'/admin/dashboard'}>
                <MdOutlineSpaceDashboard />
            </Link>
            <Link className='orders_nav-link' to={'/admin/cashier'}>
                <AiOutlineShop />

            </Link>
            <div className='orders_nav-link'>
                <input onChange={(e) => onSearchOrders(e.target.value)} placeholder='search...' className='orders_search-input' />
            </div>

        </nav>
    )
}

export default Nav

