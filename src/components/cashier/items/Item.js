import React, { useEffect, useState } from 'react'
import { useCart } from '../../../contexts/CartContext';

const Item = ({ item }) => {
    // const [qty, setQty] = useState(0);
    const { onAddToCart, onDecreaseQty, cart } = useCart()

    let itemInCart = cart.find(cartItem => cartItem.name === item.name)
    let qty = itemInCart ? itemInCart.qty : 0

    const handleAddToCart = () => {
        onAddToCart(item)
    }
    const handleDecreeseQty = (e) => {
        e.preventDefault()
        onDecreaseQty(item)
        return
    }


    return (
        <div onContextMenu={handleDecreeseQty} onClick={handleAddToCart} className={qty > 0 ? 'cashier-item__added' : ' cashier-item-container'}>
            {qty > 0 && <p className='cashier-item_qty'>{qty}+</p>}
            <img className='cashier-item_img' alt={item.name} src={item.image} />
            <p className='cashier-item_name'>{item.name} </p>
        </div>
    )
}

export default Item