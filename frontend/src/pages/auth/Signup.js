import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import './auth.css'
import Cover from '../../components/cover/Cover'

const Signup = () => {
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [fields, setFields] = useState({
        name: "",
        email: "",
        password: "",
        gender: "",
        phoneNumber: ""
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
        }).catch((err) => {
            return setError(err.response.data)
        })

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
        <div className='auth'>
            <h1>Spot<span>IN</span></h1>
            {error && <p className='auth-error__singup'>{error}</p>}
            <form className='auth-form' onSubmit={handleSubmit}>
                <input required name='name' value={fields.name} onChange={(e) => handleChange(e)} placeholder='name' type="name" />
                <input required name='email' value={fields.email} onChange={(e) => handleChange(e)} placeholder='email' type="email" />
                <input required name='phoneNumber' value={fields.phoneNumber} onChange={(e) => handleChange(e)} placeholder='phone number' type="number" />
                <input required name='gender' value={fields.gender} onChange={(e) => handleChange(e)} placeholder='gender' type="text" />
                <input required name='password' value={fields.password} onChange={(e) => handleChange(e)} placeholder='password' type="password" />
                <button className='auth-form_submit-btn' type='submit'>SINGUP</button>
                <Link className='auth_link' to='/login'>login instead</Link>

            </form>
            <div className="auth-cover">
                <Cover />
            </div>
        </div>
    )
}

export default Signup