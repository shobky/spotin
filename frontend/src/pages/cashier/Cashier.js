import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Items from '../../components/cashier/items/Items'
import Nav from '../../components/cashier/nav/Nav'
import './cashier.css'
import Cover from '../../components/cover/Cover'
import Spinner from '../../components/loading/Spinner'
import UseFetch from '../../hooks/UseFetch'
import Checkout from '../../components/cashier/checkout/Checkout'
import { ImPlus } from 'react-icons/im'
import { useItems } from '../../contexts/ItemsContext'

const Cashier = () => {

    const [checkout, setCheckout] = useState(false)
    const { items, loading } = useItems()


    const handleCheckoutScreen = () => {
        setCheckout(!checkout)
    }

    return (
        <div id="cashier" className='cashier'>
            <Nav handleCheckoutScreen={handleCheckoutScreen} />
            <div className='cashier_container'>
                {
                    loading ?

                        <div className='cashier_spinner'>
                            <Spinner  text={'Getting Items'}/>
                        </div>
                        :

                        <div className='Items-component'>
                            {
                                checkout ?
                                    <Checkout id="checkoutId" handleCheckoutScreen={handleCheckoutScreen} /> :
                                    <Items items={items} />

                            }
                        </div>
                }
            </div>
        </div>
    )
}

export default Cashier