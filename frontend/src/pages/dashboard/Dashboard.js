import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

axios.defaults.withCredentials = true;

const Dashboard = () => {
    const { currentUser } = useAuth()
   
    return (
        <div>Dashboard
            {
                currentUser && <h1>{currentUser.name}</h1>
            }

            <Link to='/admin/dashboard/items/add'>Add Items</Link>
            <br />
            <Link to='/admin/cashier'>Cashier</Link>

        </div>
    )
}

export default Dashboard