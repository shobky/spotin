import axios from 'axios';
import React, { useState } from 'react'
import { AiFillMinusCircle } from 'react-icons/ai';
import { HiPlusCircle } from 'react-icons/hi';
import { TfiMoreAlt, TfiMore } from 'react-icons/tfi'
import { useItems } from '../../contexts/ItemsContext';

const ItemInList = ({ item }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { deleteItem, updatePrice } = useItems()

    const handleMouseEnter = () => {
        setIsHovered(true);

    };
    const handleMouseLeaveHover = () => {
        setIsHovered(false);
    };

    const handleMouseLeave = (arg) => {
        setIsOpen(false)
        setIsHovered(false);
    };

    const openMoreActions = () => {
        setIsOpen(true)
    }

    return (
        <div className='items-ls_item'>
            <div className='items-ls_item-info'>
                <img className='item_list-item-img' src={item.image} alt="" />
                <div>
                    <p className='item-ls_name'> {item.name}</p>
                    <p>{item.price}L.e</p>
                </div>
            </div>
            {isHovered ? <TfiMoreAlt onClick={openMoreActions} className='item-ls_more-btn' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeaveHover} /> : <TfiMore className='item-ls_more-btn' onMouseEnter={handleMouseEnter} />}
            {
                isOpen &&
                <div onMouseLeave={handleMouseLeave} className='item-ls_more-actoins'>
                    <button>Edit</button>
                    <button onClick={() => deleteItem(item._id)}>Delete</button>
                    <div className='item-ls_price-actions'>
                        <button onClick={() => updatePrice(item, 5)}><HiPlusCircle />5</button>
                        <button onClick={() => updatePrice(item, -5)}><AiFillMinusCircle />5</button>
                    </div>


                </div>

            }
        </div>
    )
}

export default ItemInList