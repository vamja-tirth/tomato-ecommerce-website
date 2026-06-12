import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import ContactUs from './pages/ContactUs/ContactUs'
import Menu from './pages/Menu/Menu'
import FoodDetail from './pages/FoodDetail/FoodDetail'
import MobileApp from './pages/MobileApp/MobileApp'
import Wishlist from './pages/Wishlist/Wishlist'
import MyOrders from './pages/MyOrders/MyOrders'

import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
const App = () => {

  const[showLogin,setShowLogin] = useState(false)


  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}

      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/food/:id" element={<FoodDetail />} />
          <Route path="/mobile-app" element={<MobileApp />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/contact" element={<ContactUs />} />

        </Routes>
      </div>
      <Footer />
    </>

  )
}

export default App
