import React, { useEffect, useState, useCallback } from 'react'
import './Contact.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const Contact = ({ url }) => {

    const [messages, setMessages] = useState([]);

    const fetchMessages = useCallback(async () => {
        const response = await axios.get(`${url}/api/contact/list`);
        if (response.data.success) {
            setMessages(response.data.data);
        } else {
            toast.error("Error fetching messages");
        }
    }, [url]);

    useEffect(() => {
        const loadMessages = async () => {
            await fetchMessages();
        }
        loadMessages();
    }, [fetchMessages])

    return (
        <div className='contact add flex-col'>
            <p>Contact Messages</p>
            <div className="contact-list">
                <div className="contact-list-table">
                    <div className="contact-list-table-format title">
                        <b>Name</b>
                        <b>Email</b>
                        <b>Message</b>
                        <b>Date</b>
                    </div>
                    {messages.map((item, index) => {
                        return (
                            <div key={index} className='contact-list-table-format'>
                                <p>{item.name}</p>
                                <p>{item.email}</p>
                                <p>{item.message}</p>
                                <p>{new Date(item.date).toLocaleDateString()}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Contact
