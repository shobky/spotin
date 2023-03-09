import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const ItemsContext = React.createContext()

export const useItems = () => {
    return useContext(ItemsContext)
}

export const ItemsProvider = ({ children }) => {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)



    items?.sort((a, b) => a.vital - b.vital);

    const getItems = async () => {
        const res = await axios
            .get(`${process.env.REACT_APP_SERVER_URL}/api/items/get`)
            .catch((err) => console.log(err))
        const data = await res.data
        console.log(data)
        return data
    }

    const deleteItem = async (_id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/items/delete/${_id}`, {
                withCredentials: true
            })
            const updatedItems = items.filter((item) => item._id !== _id);
            setItems(updatedItems);
        }
        catch (err) {
            console.log(err)
        }
    }

    const updatePrice = async (argItem, amount) => {
        const newPrice = argItem.price + amount

        try {
            await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/items/pricing`, {
                newPrice,
                _id: argItem._id,
            })
            const updatedItems = items.map(item => {
                if (item._id === argItem._id) {
                    return { ...item, price: newPrice };
                }
                return item;
            });
            setItems(updatedItems)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getItems().then((data) => {
            setItems(data.items)
            setLoading(false)
        })
    }, [])

    const value = {
        items,
        loading,
        deleteItem,
        updatePrice
    }

    return (
        <ItemsContext.Provider value={value}>
            {children}
        </ItemsContext.Provider>
    )

}

