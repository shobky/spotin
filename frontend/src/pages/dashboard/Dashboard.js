import axios from 'axios'
import React, { useEffect, useState } from 'react'

axios.defaults.withCredentials = true;

const Dashboard = () => {
    const [currentUser, setCurrentUser] = useState()

    const sendRequest = async () => {
        const res = await axios
            .get("http://localhost:5000/api/user", {
                withCredentials: true,
            })
            .catch((err) => console.log(err));
        const data = await res.data;
        return data;
    };
    useEffect(() => {
        sendRequest().then((data) => {
            setCurrentUser(data.user)
        })
    }, [])
    return (
        <div>Dashboard
            {
                currentUser && <h1>{currentUser.name}</h1>
            }
        </div>
    )
}

export default Dashboard