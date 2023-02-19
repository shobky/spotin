import React from 'react'
import { BsCartPlus } from 'react-icons/bs'
import { useOrder } from '../../../contexts/OrderContext'
import { useNavigate } from 'react-router-dom'
import './append.css'
import axios from 'axios'

const Append = ({ order }) => {
    const { handleAppendOrder } = useOrder()
    const navigate = useNavigate()

  

    const onAppednOrder = () => {
        handleAppendOrder(order)
        navigate('/admin/cashier')
    }
    return (
        <div>
            <button onClick={onAppednOrder} className='bill_append-button'><BsCartPlus /></button>
        </div>
    )
}

export default Append