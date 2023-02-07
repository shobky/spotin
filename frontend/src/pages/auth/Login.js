import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate()
    const [fields, setFields] = useState({
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
        const res = await axios.post('http://localhost:5000/api/users/login', {
            email: fields.email,
            password: fields.password,
        }).catch(err => console.log(err))

        const data = await res.data
        return data
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        sendRequest().then(() => {
            navigate('/')
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name='email' value={fields.email} onChange={handleChange} placeholder='email' type="email" />
                <input name='password' value={fields.password} onChange={handleChange} placeholder='password' type="password" />
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login