import axios from "axios"
import React, {
    useContext,
    useState,
    useEffect
} from "react"

const OrderContext = React.createContext()

export const useOrder = () => {
    return useContext(OrderContext)
}

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)

    const [selectedOrder, setSelectedOrder] = useState(null)

    const [timeSpent, setTimeSpent] = useState({})
    const [timeSpentInMs, setTimeSpentInMs] = useState()

    const [TotalBalance, setTotalBalance] = useState()
    const [totalTicketsSold, setTotalTicketsSold] = useState()

    const [searchQ, setSearchQ] = useState('')
    const [filterQ, setFilterQ] = useState('')

    const [reload, setReload] = useState(false)

    const [appendOrder, setAppendOrder] = useState('')


    // setting totalBalance and ticketsSold values in order header component
    useEffect(() => {
        let total = 0
        let tktsSold = 0
        if (filterQ) {
            return orders.filter(order => order.status === filterQ)
                .forEach(order => {
                    total += order.subTotal
                    tktsSold += order.tickets
                    setTotalBalance(total)
                    setTotalTicketsSold(tktsSold)
                });
        }
        orders.forEach(order => {
            total += order.subTotal
            tktsSold += order.tickets

            setTotalBalance(total)
            setTotalTicketsSold(tktsSold)

        });


    }, [orders, filterQ])

    // getting all orders

    const getOrders = async () => {
        const res = await axios
            .get("http://localhost:5000/api/orders/get", {
                withCredentials: true,
            })
            .catch((err) => console.log(err));
        const data = await res.data;
        return data;
    };

    useEffect(() => {
        getOrders().then((data) => {
            setOrders(data.orders)
            setLoading(true)
        })
    }, [reload])

    // getting specific order by id send in erq params

    const getOrderByID = async (id) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/orders/get/${id}`, {
                withCredentials: true,
            });
            const order = res.data.order

            if (order) {
                // If the order is found, update its state in the client
                setOrders([...orders.filter((o) => o._id !== id), order]);
                setSelectedOrder(order)
            } else {
                // If the order is not found, log an error message
                console.log(`Order with ID ${id} not found`);
            }
        } catch (error) {
            // If there's an error, log an error message
            console.log(`Error while getting order with ID ${id}`, error);
        }
    };

    // gets the order clicked at to show it in bill component
    const handleSelectOrder = (order) => {
        setSelectedOrder(order)
        console.log({ context: order })
    }

    // calculates time spent from the data object provided by mongoDB createdAt

    useEffect(() => {
        if (!selectedOrder) {
            return
        }

        const handleTimeSpent = () => {
            const currentTime = new Date();
            const date = new Date(selectedOrder.createdAt);
            const dateDiffInMilliseconds = (currentTime - date)
            const durationInMinutes = Math.floor(dateDiffInMilliseconds / 60000);
            const durationInHours = Math.floor(durationInMinutes / 60);
            const minutes = durationInMinutes % 60;
            const formattedDuration = [durationInHours, minutes];
            setTimeSpent(formattedDuration)
            setTimeSpentInMs(dateDiffInMilliseconds)
        };

        handleTimeSpent()
    }, [selectedOrder])
    

    const onFilterOrders = (filter) => {
        setFilterQ(filter)
    }

    const onSearchOrders = (query) => {
        setSearchQ(query)
    }


    // might remove 
    const reLoadOrders = () => {
        setReload(!reload)
    }


    // gets the order that will be added to

    const handleAppendOrder = (order) => {
        setAppendOrder(order)
    }

    const value = {
        orders,
        loading,
        selectedOrder,
        handleSelectOrder,
        timeSpent,
        timeSpentInMs,
        TotalBalance,
        onFilterOrders,
        onSearchOrders,
        searchQ,
        filterQ,
        totalTicketsSold,
        reLoadOrders,
        handleAppendOrder,
        appendOrder,
        getOrderByID
    }

    return (
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
    )
}