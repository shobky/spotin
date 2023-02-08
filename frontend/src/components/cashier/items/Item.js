import React, { useState } from 'react'
import { useCart } from '../../../contexts/CartContext';

const Item = ({ item }) => {
    const [qty, setQty] = useState(0);
    const { onAddToCart, onDecreaseQty } = useCart()

    const handleAddToCart = () => {
        setQty(qty + 1)
        onAddToCart(item)
    }
    const handleDecreeseQty = (e) => {
        e.preventDefault()
        setQty(qty >= 1 ? qty - 1 : 0)
        onDecreaseQty(item)
        return
    }
    return (
        <div onContextMenu={handleDecreeseQty} onClick={handleAddToCart} className={qty >= 1 ? 'cashier-item__added' : ' cashier-item-container'}>
            {qty > 0 && <p className='cashier-item_qty'>{qty}+</p>}
            <img className='cashier-item_img' alt={item.name} src={item.image} />
            <p className='cashier-item_name'>{item.name} </p>
        </div>
    )
}

export default Item