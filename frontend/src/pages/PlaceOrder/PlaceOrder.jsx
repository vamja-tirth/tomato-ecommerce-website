import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

  const { getTotalCartAmount, token, food_list, cartItems, url, setCartItems } = useContext(StoreContext)
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item };
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 50,
    }

    try {
      let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
      if (response.data.success) {
        const { order, dbOrderId } = response.data;

        const options = {
          key: "rzp_test_SjjHCzcliaIgyz", 
          amount: order.amount,
          currency: order.currency,
          name: "Food Del",
          description: "Order Payment",
          order_id: order.id,
          handler: async function (response) {
            try {
              const verifyRes = await axios.post(url + "/api/order/verify", {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderId: dbOrderId
              }, { headers: { token } });

              if (verifyRes.data.success) {
                setCartItems({});
                toast.success("Payment Successful!");
                navigate("/"); 
              } else {
                toast.error("Payment verification failed");
                navigate("/"); 
              }
            } catch {
              toast.error("Error verifying payment");
            }
          },
          prefill: {
            name: data.firstName + " " + data.lastName,
            email: data.email,
            contact: data.phone
          },
          theme: {
            color: "#ff6347" 
          }
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (){
           toast.error("Payment failed. Please try again.");
        });
        rzp1.open();

      } else {
        toast.error("Error placing order");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  useEffect(()=>{
    if (!token) {
      navigate('/cart')
    } else if(getTotalCartAmount()===0) {
      navigate('/cart')
    }
  },[token, getTotalCartAmount, navigate])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
         <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount()===0?0:50}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount()===0?0:getTotalCartAmount()+50}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
