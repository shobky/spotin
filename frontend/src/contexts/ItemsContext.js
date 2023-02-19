import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const ItemsContext = React.createContext()

export const useItems = () => {
    return useContext(ItemsContext)
}

export const ItemsProvider = ({ children }) => {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)



    items.sort((a, b) => a.vital - b.vital);

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
            setLoading(false)
        })
    }, [])

    const value = {
        items,
        loading
    }

    return (
        <ItemsContext.Provider value={value}>
            {children}
        </ItemsContext.Provider>
    )

}

