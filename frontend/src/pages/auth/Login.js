import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Cover from '../../components/cover/Cover';

const Login = () => {
    const [error, setError] = useState('')
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
        const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/users/login`, {
            email: fields.email,
            password: fields.password,
        }).catch(err => setError(err.response.data))

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
        <div className='auth'>
            <h1>Spot<span>IN</span></h1>
            {error && <p className='auth-error'>{error}</p>}
            <form className='auth-form' onSubmit={handleSubmit}>
                <input required name='email' value={fields.email} onChange={handleChange} placeholder='email' type="email" />
                <input required name='password' value={fields.password} onChange={handleChange} placeholder='password' type="password" />
                <button className='auth-form_submit-btn' type='submit'>Login</button>
                <Link className='auth_link' to='/signup'>signup instead</Link>
            </form>
            <div className="auth-cover">
                <Cover />
            </div>
        </div>
    )
}

export default Login