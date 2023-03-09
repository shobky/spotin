// import axios from "axios"
import React, {
    useContext,
    useEffect,
    useState,
    // useEffect
} from "react"
import { useOrder } from "./OrderContext"
const CartContext = React.createContext()

export const useCart = () => {
    return useContext(CartContext)
}

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    const [cartTotal, setCartTotal] = useState(0);
    const [itemCount, setItemCount] = useState(0);
    const [uniqueItemCount, setUniqueItemCount] = useState(0);
    const [tickets, setTickets] = useState(0);

    const ticketTotal = tickets * 15
    const subTotal = (cartTotal + ticketTotal);
    const checkedIn = tickets > 0 ? true : false

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

    const onAddTicket = () => {
        setTickets(tickets + 1)
    }

    const onRemoveTicket = () => {
        setTickets(tickets > 0 ? tickets - 1 : 0)
    }

    const onSubmitOrder = () => {
        setCart([])
        setTickets(0)
    }

    // function calculateTicketPrice(numTickets, time) {
    //     const ticketPrice = Number(15);
    //     const currentTime = new Date();
    //     const timeDifferenceInMinutes = (currentTime - time) / 1000 / 60;

    //     let totalPrice = numTickets * ticketPrice;
    //     if (timeDifferenceInMinutes >= 60) {
    //         //   const additionalHours = Math.floor(timeDifferenceInMinutes / 60);
    //         //   const updatedTicketPrice = ticketPrice + (additionalHours * 10);
    //         //   totalPrice = numTickets * updatedTicketPrice;
    //         totalPrice += tickets * ticketPrice
    //     }

    //     setTicketTotal(totalPrice)
    //     return totalPrice;
    // }

    // useEffect(() => {
    //     calculateTicketPrice()
    // }, [tickets])


    const value = {
        cart,
        onAddToCart,
        onDecreaseQty,
        cartTotal,
        itemCount,
        uniqueItemCount,
        onAddTicket,
        onRemoveTicket,
        tickets,
        // calculateTicketPrice,
        ticketTotal,
        subTotal,
        checkedIn,
        onSubmitOrder
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}