import React, { useEffect, useState, useCallback } from 'react'
import "./Orders.css"
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = useCallback(async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      const sortedOrders = response.data.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setOrders(sortedOrders);
    } else {
      toast.error("Error fetching orders");
    }
  }, [url]);

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value
    });
    if (response.data.success) {
      await fetchAllOrders();
      toast.success(response.data.message);
    }
  }

  useEffect(() => {
    const loadOrders = async () => {
      await fetchAllOrders();
    }
    loadOrders();
  }, [fetchAllOrders])

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        <div className="order-item order-item-header">
          <b>Order Info</b>
          <b>Items</b>
          <b>Amount</b>
          <b>Status</b>
          <b>Action</b>
        </div>
        {orders.map((order, index) => (
          <div key={index} className='order-item'>
            <div>
              <div className='admin-order-items-list'>
                {order.items.map((item, idx) => (
                  <div key={idx} className='admin-order-item-row'>
                    <img src={url + "/images/" + item.image} alt={item.name} />
                    <p>{item.name} x {item.quantity}</p>
                  </div>
                ))}
              </div>
              <p className='order-item-name'>{order.address.firstName + " " + order.address.lastName}</p>
              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
              <p className='order-item-email'>{order.address.email}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>₹{order.amount}</p>
            <p className={`payment-status ${order.payment ? 'paid' : 'unpaid'}`}>{order.payment ? 'Paid' : 'Unpaid'}</p>
            <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
