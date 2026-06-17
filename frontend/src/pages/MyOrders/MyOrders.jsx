import React, { useContext, useEffect, useState, useCallback } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { assets } from '../../assets/assets'

const MyOrders = () => {

    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = useCallback(async () => {
        const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
        if (response.data.success) {
            const sortedOrders = response.data.data.sort((a, b) => new Date(b.date) - new Date(a.date));
            setData(sortedOrders);
        }
    }, [url, token]);

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
            if (response.data.success) {
                const sortedOrders = response.data.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setData(sortedOrders);
            }
        }
        if (token) {
            fetchOrders();
        }
    }, [url, token])

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {data.map((order, index) => {
                    return (
                        <div key={index} className='my-orders-order'>
                            <div className="order-details">
                                <div className='order-items-list'>
                                    {order.items.map((item, index) => (
                                        <div key={index} className='order-item-row'>
                                            <img src={url + "/images/" + item.image} alt={item.name} />
                                            <p>{item.name} x {item.quantity}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="order-meta">
                                    <p className='order-amount'>₹{order.amount}.00</p>
                                    <p className='order-count'>Items: {order.items.length}</p>
                                </div>
                            </div>
                            <div className="order-status-container">
                                <p className='order-status'><span>&#x25cf;</span> <b>{order.status}</b></p>
                                <button onClick={fetchOrders} className='track-btn'>Track Order</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MyOrders
