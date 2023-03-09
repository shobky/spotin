import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { GoDiffAdded } from 'react-icons/go'
import { BsShop } from 'react-icons/bs'
import { FaClipboardList } from 'react-icons/fa'
import { RxUpdate } from 'react-icons/rx'



import './dashboard.css'
import { MdOutlinePayments } from 'react-icons/md';
import { HiLogin } from 'react-icons/hi';

axios.defaults.withCredentials = true;

const Dashboard = () => {
    const { currentUser, logout } = useAuth()

    return (
        <div className='dashboard_container'>
            {
                currentUser ?
                    <div>
                        <h1>Hello, {currentUser.name?.toUpperCase()}</h1>
                        <button onClick={() => logout()} className="dashboard_logout-link">Logout <HiLogin className='dashboard_logout-ico' /></button>
                    </div> : <Link to='/login' className="dashboard_login-link">Login <HiLogin className='dashboard_login-ico' /></Link>
            }
            <div className='dashboard_links'>
                <Link className='dashboard_link dl_ai' to='/admin/dashboard/items/add'><GoDiffAdded className='dashboard_link-ico' /> ADD ITEMS</Link>
                <Link className='dashboard_link dl_ca' to='/admin/cashier'> <BsShop className='dashboard_link-ico' />SHOP</Link>

                <Link className='dashboard_link dl_le' to='/admin/ledger'><FaClipboardList className='dashboard_link-ico' />LEDGER</Link>

                <Link className='dashboard_link dl_or' to='/admin/orders'><MdOutlinePayments className='dashboard_link-ico' />ORDERS</Link>

                <Link className='dashboard_link dl_up' to='/admin/update'><RxUpdate className='dashboard_link-ico' />UPDATE</Link>
            </div>

        </div>
    )
}

export default Dashboard