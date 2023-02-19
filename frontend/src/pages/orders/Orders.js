import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Bill from '../../components/orders/bill/Bill';
import Header from '../../components/orders/header/Header';
import Nav from '../../components/orders/nav/Nav';
import Order from '../../components/orders/Order';
import { useOrder } from '../../contexts/OrderContext';
import './orders.css'

const Orders = () => {
    const { orders, searchQ, filterQ } = useOrder()

    orders.sort((a, b) => new Date(a.createdAt) -  new Date(b.createdAt));

    return (
        <div className='orders-page'>
            <Nav />
            <Header />
            <div className='orders_container'>
                <div >
                    <div className='orders_container_head'>
                        <p>Time</p>
                        <p>Cutomer</p>
                        <p>Status</p>
                    </div>
                    <div className='orders'>
                        {
                            orders.filter((order) => {
                                if (searchQ === ' ') {
                                    return order
                                } else if (order.status.toLowerCase().includes(filterQ.toLowerCase())) {
                                    return order
                                } else {
                                }
                            }).filter((order) => {
                                if (searchQ === ' ') {
                                    return order
                                } else if (order.customerName.toLowerCase().includes(searchQ.toLowerCase())) {
                                    return order
                                } else {
                                }
                            }).map((order) => (
                                <Order key={order._id} order={order} />
                            ))
                        }
                    </div>
                </div>
                <div>
                    <Bill />
                </div>
            </div>
        </div>
    )
}

export default Orders