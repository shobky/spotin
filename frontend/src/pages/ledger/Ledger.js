import React, { useEffect, useState } from 'react'
import { MdOutlineArrowBack } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useOrder } from '../../contexts/OrderContext'
import './ledger.css'
import Order from '../../components/orders/Order'
import { FaEquals, FaPlus } from 'react-icons/fa'
import { IoTicketSharp } from 'react-icons/io5'

const Ledger = () => {
    const { orders } = useOrder()
    const [populatItems, setPopularItems] = useState([])



    useEffect(() => {
        const getMostPopularItems = () => {
            // Create an empty object to store the quantity of each item
            const itemQuantities = {};

            // Loop through each order in the orders array
            orders.forEach(order => {
                // Loop through each item in the cart array of the order
                order.cart.forEach(item => {
                    // If the item's name is already in the itemQuantities object, add its qty to the existing value
                    // If the item's name is not yet in the itemQuantities object, set its qty to the item's qty
                    itemQuantities[item.name] = (itemQuantities[item.name] || 0) + item.qty;
                });
            });

            // Convert the itemQuantities object into an array of objects with the item name and qty
            const itemQuantitiesArray = Object.entries(itemQuantities).map(([name, qty]) => ({ name, qty }));

            // Sort the itemQuantitiesArray in descending order by the qty
            itemQuantitiesArray.sort((a, b) => b.qty - a.qty);

            // Return an array of the 5 most popular items
            setPopularItems(itemQuantitiesArray.slice(0, 5))
        }

        getMostPopularItems()
        return
    }, [orders])

    return (
        <div className='ledger'>
            <div className='blob'></div>
            <Link to='/admin/dashboard' className='ledger_back-link'><MdOutlineArrowBack /></Link>
            <div className='ledger_orders'>
                <div className='ledger_orders__div ledger_orders__open'>
                    <p className='ledger_orders_head'>Open</p>
                    <p className='ledger_orders-number__open'>{orders.filter((o) => o.status === 'open').length}</p>
                    <p className='ledger_orders-total ledger_orders-number__open'>150 LE</p>
                </div>
                <FaPlus />
                <div className='ledger_orders__div ledger_orders__closed'>
                    <p className='ledger_orders_head'>Closed</p>
                    <p className='ledger_orders-number__closed'>{orders.filter((o) => o.status === 'open').length}</p>
                    <p className='ledger_orders-total ledger_orders-number__closed'>600 LE</p>
                </div>
                <FaEquals />
                <div className='ledger_orders__div ledger_orders__all'>
                    <p className='ledger_orders_head'>All</p>
                    <p className='ledger_orders-number__all '>{orders.length}</p>
                    <p className='ledger_orders-total ledger_orders-number__all'>750 LE</p>
                </div>
            </div>
            <p className='ledger_traffic'>Trafic in the workspace <span> <IoTicketSharp /> 15 </span></p>
            <ol className='ledger_popular-items-list'>
                <p className='ledger_pop-list-header'>Popular Items Today</p>
                {
                    populatItems.map((popularItem) => (
                        <li className='ledger_popular-item' key={popularItem.name}>{popularItem.name} <span> x{popularItem.qty}</span></li>
                    ))
                }
            </ol>
        </div>
    )
}

export default Ledger