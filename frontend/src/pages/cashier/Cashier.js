import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Items from '../../components/cashier/items/Items'
import { useCart } from '../../contexts/CartContext'
import './cashier.css'

const Cashier = () => {

    const [items, setItems] = useState([])
    items.sort((a, b) => a.vital - b.vital);

    const { cartTotal,
        itemCount,
        uniqueItemCount } = useCart()



    const getItems = async () => {
        const res = await axios
            .get("http://localhost:5000/api/items/get")
            .catch((err) => console.log(err))
        const data = await res.data
        return data
    }

    useEffect(() => {
        getItems().then((data) => {
            setItems(data.items)
        })
    }, [])

    return (
        <div className='cashier'>
            <p>
                ${cartTotal} - I{itemCount} - U{uniqueItemCount}
            </p>
            <div className='Items-component'>
                <Items items={items} />
            </div>
        </div>
    )
}

export default Cashier