import React from 'react'
import Item from './Item'
import './items.css'
const Items = ({ items }) => {
  
    return (
    <div className='cashier-items'>
        {
            items?.map((item, index) => (
                <Item
                    item={item} key={item._id} index={index}
                />
            ))
        }
    </div>

    )
}

export default Items