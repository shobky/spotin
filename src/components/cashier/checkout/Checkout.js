import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom/client';
import './checkout.css'
import { useCart } from '../../../contexts/CartContext'
import { HiOutlineShoppingCart } from 'react-icons/hi'
import { IoTicketSharp } from 'react-icons/io5'
import { IoIosAddCircleOutline, IoIosCloseCircle, IoIosRemoveCircleOutline } from 'react-icons/io'
import Cover from '../../cover/Cover'
import axios from 'axios'
import { useOrder } from '../../../contexts/OrderContext';
import Spinner from '../../loading/Spinner';

const Checkout = ({ handleCheckoutScreen }) => {

    const { cart, tickets,
        cartTotal,
        itemCount,
        ticketTotal,
        onAddToCart,
        onDecreaseQty,
        checkedIn,
        subTotal,
        onSubmitOrder
    } = useCart()

    const { getOrderByID,
        appendOrder,
        reLoadOrders } = useOrder()

    const [sending, setSending] = useState(false)

    const [customerName, setCustomerName] = useState(appendOrder ? appendOrder.customerName : '')

    const date = new Date()

    const sendRequest = async () => {

        const mergedCart = (appendOrder && [...appendOrder.cart]) || [];

        cart.forEach((cartItem) => {
            const existignCartItem = mergedCart.find((oldCartItem) => oldCartItem._id === cartItem._id);

            if (existignCartItem) {
                // If an object with the same id exists in arr1, update its qty
                existignCartItem.qty += cartItem.qty;
            } else {
                // If no object with the same id exists in arr1, add the object to the merged array
                mergedCart.push(cartItem);
            }
        });

        const newCartItems = mergedCart.map(({ image, ...rest }) => rest)

        const res = appendOrder
            ? await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/orders/update`, {
                id: appendOrder._id,
                cart: newCartItems,
                cartTotal: appendOrder.cartTotal + cartTotal,
                tickets: appendOrder.tickets + tickets,
                ticketsPrice: (appendOrder.ticketsPrice + tickets * 15),
                subTotal: appendOrder.subTotal + subTotal,
                status: appendOrder.status
            })
            : await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/orders/add`, {
                customerName,
                cart: newCartItems,
                cartTotal: cartTotal,
                checkedIn,
                tickets: tickets,
                ticketsPrice: tickets * 15,
                subTotal: subTotal,
                status: 'open',
                timeSpent: [0, 0]
            });

        return res.data;
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSending(true)
        sendRequest().then(() => {
            handleCheckoutScreen(false)
            onSubmitOrder()
            setSending(false)

            document.getElementById('navOrders').classList.add("orderComplete")
            setTimeout(() => {
                if (appendOrder) {
                    getOrderByID(appendOrder._id)
                } else {
                    reLoadOrders()
                }
                document.getElementById('navOrders').classList.remove("orderComplete")
            }, 1000);
        }).catch((err) => {
            setSending(false)
            console.log(err)
        })
    }


    return (
        <div className='checkout'>
            <div className='checkout_cover'>
                <Cover />
            </div>
            <form onSubmit={handleSubmit}>
                <div className='checkout-container'>
                    <h1 className='checkout-header'>Checkout</h1>
                    <input disabled={appendOrder ? true : false} value={customerName} required onChange={(e) => setCustomerName(e.target.value)} className='checkout_cutomer-name-input' placeholder='CUSTOMER NAME' />

                    <div className='checkout_order-details'>
                        <p>{date.getTime()}</p>
                        <p>{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</p>
                        <p>{`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}</p>
                    </div>
                    <br />
                    <div className='checkout_prices'>
                        <p className='checkout_prices-p'><HiOutlineShoppingCart /><span className='checkout-price-span'>{cartTotal} le</span></p>
                        <p className='checkout_prices-p'><IoTicketSharp /><span className='checkout-price-span'> {ticketTotal}le</span></p>
                        <br />
                        <br />
                        <p className='checkout-totalprice'>{subTotal} le</p>

                    </div>
                    <div>
                        <button disabled={sending} type='submit' className='checkout-btn'>{sending ? <Spinner text={''} /> : 'PUT'}</button>
                    </div>

                </div>
            </form>


            <div className='checkout_cart-view'>
                <h2 className='checkout_cart-header'> Cart{itemCount <= 0 ? ' Is Empty' : ""}</h2>
                {
                    cart.map((cartItem, index) => (
                        <div className='checkout_cart-item' key={index}>
                            <div className='checkout_cart_item-info'>
                                <img className='checkout_cart_item-img' alt={cartItem.name} src={cartItem.image} />
                                <div>
                                    <p className='checkout_cart_item-name'>{cartItem.name}</p>
                                    <p className='checkout_cart_item-price'>price: {cartItem.price}le</p>
                                    <p className='checkout_cart_item-qty'>qty : {cartItem.qty}</p>
                                </div>
                            </div>
                            <div className='checkout_cart_item-btns'>
                                <IoIosRemoveCircleOutline onClick={() => onDecreaseQty(cartItem)} className='checkout_cart_item-btn' />
                                <IoIosAddCircleOutline onClick={() => onAddToCart(cartItem)} className='checkout_cart_item-btn' />
                                <IoIosCloseCircle className='checkout_cart_item-btn' />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Checkout