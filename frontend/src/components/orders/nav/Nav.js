import React, { useEffect, useState } from 'react'
import { MdOutlineSpaceDashboard } from 'react-icons/md'
import { AiOutlineShop } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import Logo from '../../Logo'

import './nav.css'
import { useOrder } from '../../../contexts/OrderContext'
const Nav = () => {
    const { onSearchOrders } = useOrder()

    return (
        <nav className='orders_nav'>
            <div className='orders_nav_logo-search'>
                <h1 style={{ fontFamily: 'monBold' }}>Orders</h1>
            </div>
            <div className='orders_nav_link-search'>
                <input onChange={(e) => onSearchOrders(e.target.value)} placeholder='SEARCH ORDERS' className='orders_search-input' />
                <div className='orders_nav-links'>
                    <Link className='orders_cashier_nav-link' to={'/admin/dashboard'}>
                        <MdOutlineSpaceDashboard />
                    </Link>
                    <Link className='orders_cashier_nav-link' to={'/admin/cashier'}>
                        <AiOutlineShop />
                    </Link>
                </div>
            </div>


        </nav>
    )
}

export default Nav