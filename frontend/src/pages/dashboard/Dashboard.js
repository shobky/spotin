import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext';

axios.defaults.withCredentials = true;

const Dashboard = () => {
    const [items, setItems] = useState([])
    const { currentUser } = useAuth()

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
        })
    }, [])
    return (
        <div>Dashboard
            {
                currentUser && <h1>{currentUser.name}</h1>
            }
            {
                items &&
                items.map((item) => (
                    <>
                        <p>{item.name}</p>
                        <p>{item.price}</p>
                        <p>{item.category}</p>


                    </>
                ))

            }
        </div>
    )
}

export default Dashboard