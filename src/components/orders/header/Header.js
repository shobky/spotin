import React, { useState } from 'react'
import { BsLockFill, BsUnlockFill } from 'react-icons/bs'
import { FaMoneyBill, FaShoppingCart } from 'react-icons/fa'
import { IoTicketSharp } from 'react-icons/io5'
import { useOrder } from '../../../contexts/OrderContext'
import './header.css'

const Header = () => {
    const { orders, TotalBalance, onFilterOrders, filterQ, totalTicketsSold } = useOrder()
    const filteredOrders = filterQ ? orders.filter(order => order.status === filterQ) : orders

    const handleClearFilter = (e) => {
        e.preventDefault()
        onFilterOrders('')
    }
    return (
        <div className='orders_header'>
            <div onContextMenu={handleClearFilter} onClick={() => onFilterOrders('open')} className='orders_header-btn ohb_button'><BsUnlockFill className='orders_header_btn-ico ohb_open ' /> <h4>In</h4></div>
            <div onContextMenu={handleClearFilter} onClick={() => onFilterOrders('closed')} className='orders_header-btn ohb_button'><BsLockFill className='orders_header_btn-ico ohb_closed' /> <h4>Paid</h4> </div>
            <div style={{ width: '17vw' }}></div>
            <div className='orders_header-btn'><FaShoppingCart className='orders_header_btn-ico ohb_orders' /> <p>{filterQ ? filterQ : 'All'} orders <span>{filteredOrders.length} orders</span></p> </div>
            <div className='orders_header-btn'><FaMoneyBill className='orders_header_btn-ico ohb_balance' /> <p>Total balance <span>{TotalBalance} LE</span></p> </div>
            <div className='orders_header-btn'><IoTicketSharp className='orders_header_btn-ico ohb_tickts' /> <p>Tickets sold <span>{totalTicketsSold}</span></p> </div>
        </div>
    )
}

export default Header