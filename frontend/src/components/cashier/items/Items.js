import React from 'react'
import Item from './Item'
import './items.css'
const Items = ({ items }) => {
  
    return (
    <div className='cashier-items'>
        {
            items?.map((item) => (
                <Item
                    item={item} key={item.id}
                />
            ))
        }
    </div>

    )
}

export default Items