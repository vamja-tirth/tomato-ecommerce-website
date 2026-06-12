import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className='navbar'>
      <div className='logo-container' onClick={() => navigate('/')}>
        <img className='logo' src={assets.logo} alt="logo" />
      </div>
      <img className='profile' src={assets.profile_image} alt="profile" />
    </div>
  )
}

export default Navbar
