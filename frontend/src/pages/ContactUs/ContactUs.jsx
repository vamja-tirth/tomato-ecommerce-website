import React, { useState, useContext } from 'react'
import './ContactUs.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const ContactUs = () => {

    const { url } = useContext(StoreContext)

    const [data, setData] = useState({
        name: "",
        email: "",
        message: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${url}/api/contact/save`, data);
            if (response.data.success) {
                toast.success(response.data.message);
                setData({
                    name: "",
                    email: "",
                    message: ""
                })
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    return (
        <div className='contact-us' id='contact-us'>
            <form onSubmit={onSubmitHandler} className="contact-us-container">
                <div className="contact-us-title">
                    <h2>Contact Us</h2>
                </div>
                <div className="contact-us-inputs">
                    <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
                    <textarea name='message' onChange={onChangeHandler} value={data.message} rows="6" placeholder='Your message' required></textarea>
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default ContactUs
