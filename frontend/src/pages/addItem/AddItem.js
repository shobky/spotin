import axios from 'axios';
import React, { useState } from 'react'
import './addItem.css'

const AddItem = () => {
    const [item, setItem] = useState({
        name: '',
        image: '',
        price: '',
        category: '',
        vital: '',
    })

    // handeling changes of every field exept image

    const handleChange = (e) => {
        setItem((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleImgChange = (e) => {
        const file = e.target.files[0];
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

        const res = await axios.post('http://localhost:5000/api/items/add', {
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
            alert('please add image again')
            return
        }
        sendRequest().then(() => {
            alert('DONE')
        })
    }


    return (
        <div>
            <form onSubmit={handleSubmit} className='add-item'>
                <input required value={item.name} name='name' onChange={(e) => handleChange(e)} type={'text'} placeholder='name' />
                <input required name='image' onChange={(e) => handleImgChange(e)} type={'file'} placeholder='image' />
                <input required value={item.price} name='price' onChange={(e) => handleChange(e)} type={'number'} placeholder='price' />
                <input required value={item.category} name='category' onChange={(e) => handleChange(e)} type={'text'} placeholder='category' />
                <input required value={item.vital} name='vital' onChange={(e) => handleChange(e)} type={'number'} placeholder='vital' />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default AddItem