import React, { useEffect, useState } from 'react'
import Logo from '../../Logo'
import { HiOutlineShoppingCart } from 'react-icons/hi'
import { MdOutlinePayments, MdOutlineSpaceDashboard } from 'react-icons/md'

import { IoIosAddCircleOutline, IoIosRemoveCircleOutline } from 'react-icons/io'

import { IoTicketSharp } from 'react-icons/io5'
import './nav.css'
import { Link } from 'react-router-dom'
import { useCart } from '../../../contexts/CartContext'
const Nav = ({ handleCheckoutScreen }) => {
    const { cart, cartTotal, onAddTicket, onRemoveTicket, tickets } = useCart()

    const handleRemoveTicket = (e) => {
        e.preventDefault()
        onRemoveTicket()
    }

    const handleAddTicket = () => {
        onAddTicket()
    }

    return (
        <nav className='cashier_nav'>
            <h1 style={{fontFamily:"monExBold"}}>Shop</h1>
            <Link className='cashier_nav-link' to={'/admin/dashboard'}>
                <MdOutlineSpaceDashboard />
            </Link>
            <Link className='cashier_nav-link' to={'/admin/orders'}>
                <MdOutlinePayments id='navOrders' />
            </Link>
            <div onClick={handleCheckoutScreen} className='cashier_nav-link'>
                <HiOutlineShoppingCart className='cashier_nav-cart-ico' />
            {cart.length >= 1 && <span className='cashier_nav-link_badge'></span>}
                {cartTotal >= 1 && <span className='cashier_nav-link_total'>{cartTotal}le</span>}
            </div>
            <div onClick={handleAddTicket} onContextMenu={handleRemoveTicket} className='cashier_nav-link__ticket'>
                <IoTicketSharp className={tickets > 0 ? 'cashier_nav-ico_active' : ''} />
                {tickets >= 1 && <span className='cashier_nav-link_ticket-num'>{tickets}</span>}
            </div>


        </nav>
    )
}

export default Nav