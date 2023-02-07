import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const navigate = useNavigate()
    const [fields, setFields] = useState({
        name: "",
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        setFields((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const sendRequest = async () => {
        const res = await axios.post('http://localhost:5000/api/users/signup', {
            name: fields.name,
            email: fields.email,
            password: fields.password,
        }).catch(err => console.log(err))

        const data = await res.data
        return data
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        sendRequest().then(() => {
            navigate('/login')
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name='name' value={fields.name} onChange={(e) => handleChange(e)} placeholder='name' type="name" />
                <input name='email' value={fields.email} onChange={(e) => handleChange(e)} placeholder='email' type="email" />
                <input name='password' value={fields.password} onChange={(e) => handleChange(e)} placeholder='password' type="password" />
                <button type='submit'>Signup</button>
            </form>
        </div>
    )
}

export default Signup