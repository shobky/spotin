import axios from 'axios';
import React, { useState } from 'react'
import './addItem.css'
import { MdOutlineArrowBack } from 'react-icons/md'
import { Link } from 'react-router-dom'

const AddItem = () => {
    const [item, setItem] = useState({
        name: '',
        image: '',
        price: '',
        category: '',
        vital: '',
    })
    const [img, setImg] = useState(null)

    // handeling changes of every field exept image

    const handleChange = (e) => {
        setItem((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleImgChange = (e) => {
        const file = e.target.files[0];
        setImg(URL.createObjectURL(file))
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            const image = new Image();
            image.src = e.target.result;

            // compressing the image 
            image.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = 150;
                canvas.height = 150;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(image, 0, 0, 150, 150);

                // converting the image to base-64 encoded file 
                const compressedImage = canvas.toDataURL('image/png', 0.2);
                setItem((prev) => ({
                    ...prev,
                    image: compressedImage,
                }));
            };
        };
    };

    const sendRequest = async () => {


        const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/items/add`, {
            name: item.name,
            image: item.image,
            price: item.price,
            category: item.category,
            vital: item.vital,
        }).catch((err) => {
            return console.log(err)
        })

        const data = await res.data
        return data
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (item.image === '') {
            alert('please add an image first')
            return
        }
        sendRequest().then(() => {
            alert('DONE')
        })
    }


    return (
        <div className='add-item_contaienr'>
            <Link className='add-item-backlink' to={'/admin/dashboard'}><MdOutlineArrowBack /></Link>
            {
                img ?
                    <div className='add-item-img-area'>
                        <img className='add-item_Img' src={img && img} alt={item?.name} />
                        <input className='add-item-img-area_input' required name='image' onChange={(e) => handleImgChange(e)} type={'file'} placeholder='image' />
                    </div>
                    : <div className='add-item-img-area'>
                        <p>Add a picture</p>
                        <input className='add-item-img-area_input' required name='image' onChange={(e) => handleImgChange(e)} type={'file'} placeholder='image' />

                    </div>
            }
            <form onSubmit={handleSubmit} className='add-item'>
                <input required value={item.name} name='name' onChange={(e) => handleChange(e)} type={'text'} placeholder='name' />
                <input required value={item.price} name='price' onChange={(e) => handleChange(e)} type={'number'} placeholder='price' />
                <input required value={item.category} name='category' onChange={(e) => handleChange(e)} type={'text'} placeholder='category' />
                <input required value={item.vital} name='vital' onChange={(e) => handleChange(e)} type={'number'} placeholder='vital' />
                <button className='add-item_submit-btn' type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default AddItem