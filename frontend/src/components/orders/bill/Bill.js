import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useOrder } from '../../../contexts/OrderContext'
import Append from '../append/Append'
import Spinner from '../../loading/Spinner'
import './bill.css'

const Bill = () => {
    const { selectedOrder,
        timeSpent,
        timeSpentInMs,
        getOrderByID } = useOrder()

    const [sending, setSending] = useState(false)
    const [changed, setChanged] = useState(false)


    const date = new Date(selectedOrder?.createdAt);

    const [currentOrder, setCurrentOrder] = useState(selectedOrder ? selectedOrder : "")


    useEffect(() => {
        if (!selectedOrder && !timeSpentInMs) {
            return
        }
        const current = { ...selectedOrder }
        if (timeSpentInMs / (1000 * 60 * 60) >= 1) {
            current.ticketsPrice = (selectedOrder.tickets * 25)
            current.subTotal = (selectedOrder.cartTotal + selectedOrder.tickets * 25)
            setCurrentOrder(current)
        } else {
            current.ticketsPrice = (selectedOrder.ticketsPrice)
            setCurrentOrder(current)
        }
    }, [selectedOrder, timeSpentInMs])

    useEffect(() => {
        if (changed) {
            setTimeout(async () => {
                await getOrderByID(currentOrder._id)
                setChanged(!changed)
            }, 500);
        }
    }, [changed])

    const sendRequest = async (wtd) => {
        const res = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/orders/update`, {
            ticketsPrice: currentOrder.ticketsPrice,
            subTotal: currentOrder.subTotal,
            status: wtd,
            tiemSpent: timeSpent,
            id: currentOrder._id,
            cart: currentOrder.cart,
            cartTotal: currentOrder.cartTotal,
            tickets: currentOrder.tickets,
        })((err) => {
            return console.log(err)
        })

        const data = await res.data
        return data
    }

    const onCloseOrder = async (e) => {

        e.preventDefault()
        setSending(true)
        await sendRequest('closed').then(() => {
            setSending(false)
            setChanged(!changed)
        }).catch((err) => {
            setSending(false)
        })
        setChanged(!changed)
    }

    const onOpenOrder = async (e) => {
        e.preventDefault()
        setSending(true)
        await sendRequest('open').then(() => {
            setSending(false)
        }).catch((err) => {
            setSending(false)
        })
        setChanged(!changed)
    }

    return (
        <div className='bill'>
            {
                currentOrder &&
                <>
                    <div>
                        {
                            currentOrder.status === 'open' && <Append order={currentOrder} />
                        }
                        <p className='bill_name'>{currentOrder.customerName}</p>
                        <p>{currentOrder._id}</p>
                        <br />
                        <p className='bill_time'>{date.getDate()}/{date.getMonth()}/{date.getFullYear()}</p>
                        <p className='bill_time'>{date.getHours()}:{date.getMinutes()}</p>
                    </div>
                    <br />
                    <div>
                        <p><strong>Tickets:</strong>  {currentOrder.tickets}</p>
                        <p><strong>Tickets price:</strong>  {currentOrder.ticketsPrice} LE</p>
                        <p><strong>Time spent:</strong>  {currentOrder.timeSpent ?? timeSpent ? `${timeSpent[0]}:${timeSpent[1]}` : ""} </p>


                        <br />
                        {
                            currentOrder.cart &&
                            <div>
                                <strong>Cart: </strong>
                                <div className='bill_cart-items'>
                                    {
                                        currentOrder.cart.map((cartItem) => (
                                            <p key={cartItem._id} className='bill_cart-item'>{cartItem.qty}x{cartItem.name} {cartItem.price * cartItem.qty}LE</p>
                                        ))
                                    }
                                    <br />
                                    <p>
                                        <strong>Cart total :</strong> {currentOrder.cartTotal} LE</p>
                                </div>
                            </div>
                        }
                    </div>
                    <div className='bill_actions' >
                        <p className='bill_subtotal'> {currentOrder.subTotal} LE</p>
                        {
                            selectedOrder.status === 'open' ?
                                <button disabled={sending} onClick={onCloseOrder} className='bill_action-btn'>{sending ? <Spinner text={''} /> : 'CHECKOUT'}</button>
                                :
                                <button disabled={sending} onClick={onOpenOrder} className='bill_action-btn bab_reopen'>{sending ? <Spinner text={''} /> : 'REOPEN'}</button>

                        }
                    </div>

                </>
            }

        </div>
    )
}

export default Bill