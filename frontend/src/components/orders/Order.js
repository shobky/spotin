import React, { useEffect } from 'react'
import { GiPlainCircle } from 'react-icons/gi'
import { useOrder } from '../../contexts/OrderContext';

const Order = ({ order }) => {
    const date = new Date(order.createdAt);
    const { handleSelectOrder, selectedOrder } = useOrder()

    const onSelectOrder = () => {
        handleSelectOrder(order)
        console.log({ order: order })
    }


    return (
        <div onClick={onSelectOrder} className={selectedOrder?._id === order?._id ? 'orders_selectedOrder' : 'order'}>
            <p className='order_date'>{date.getHours()}:{date.getMinutes()}</p>
            <p className='order_name'>{order.customerName}</p>
            <p className='order_status'>{order.status === "open" ? <GiPlainCircle /> : <GiPlainCircle style={{ color: 'rgb(231, 131, 8)' }} />} </p>
        </div>
    )
}

export default Order