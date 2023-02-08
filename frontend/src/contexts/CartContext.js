// import axios from "axios"
import React, {
    useContext,
    useEffect,
    useState,
    // useEffect
} from "react"

const CartContext = React.createContext()

export const useCart = () => {
    return useContext(CartContext)
}

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    const [cartTotal, setCartTotal] = useState(0);
    const [itemCount, setItemCount] = useState(0);
    const [uniqueItemCount, setUniqueItemCount] = useState(0);

    useEffect(() => {
        let newTotal = 0;
        let count = 0;
        let uniqueCount = new Set(cart.map((item) => item.name)).size;
        cart.forEach((item) => {
            newTotal += item.price * item.qty;
            count += item.qty;
        });
        setCartTotal(newTotal);
        setItemCount(count);
        setUniqueItemCount(uniqueCount);
    }, [cart]);


    const onAddToCart = (item) => {
        const itemIndex = cart.findIndex((cartItem) => cartItem.name === item.name);

        if (itemIndex === -1) {
            setCart([...cart, { ...item, qty: 1 }]);
        } else {
            const newCart = [...cart];
            newCart[itemIndex].qty += 1;
            setCart(newCart);
        }
    };

    const onDecreaseQty = (item) => {
        const itemIndex = cart.findIndex((cartItem) => cartItem.name === item.name);
        const newCart = [...cart];
        newCart[itemIndex].qty -= 1;

        if (newCart[itemIndex].qty === 0) {
            newCart.splice(itemIndex, 1);
        }

        setCart(newCart);
    };


    const value = {
        cart,
        onAddToCart,
        onDecreaseQty,
        cartTotal,
        itemCount,
        uniqueItemCount
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}