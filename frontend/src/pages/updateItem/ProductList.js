import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ItemInList from './ItemInList'
import './productList.css'
import { BiArrowBack } from 'react-icons/bi'
import { MdFilterAlt } from 'react-icons/md';
import { useItems } from '../../contexts/ItemsContext'

const ProductList = () => {

    const { items } = useItems()
    const [searchQ, setSearchQ] = useState('')


    return (
        <div style={{ background: 'white' }}>
            <header className='item-ls_header'>
                <div className='item-ls-header_left'>
                <Link to='/admin/dashboard'><BiArrowBack style={{ fontSize: '25PX', color: "black" }} /></Link>
                <h1 style={{fontFamily:"monReg"}} className='items-list_head'>Items</h1>
                </div>
                <input onChange={(e) => setSearchQ(e.target.value)} placeholder='search' className='item-ls_seach-input' />
            </header>
            <div className='items-list'>
                <div className='items-list_items-container'>
                    {
                        items?.filter((fItems) => {
                            if (searchQ === '') {
                                return fItems
                            } else if (fItems.name.toLowerCase().includes(searchQ.toLowerCase())) {
                                return fItems
                            } else {
                            }
                        }).map((item, index) => (
                            <ItemInList key={index} item={item} />
                        ))
                    }
                </div>
            </div>

        </div>
    )
}

export default ProductList