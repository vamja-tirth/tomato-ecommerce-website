import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
import { MdMenu } from 'react-icons/md'

const Navbar = ({ setShowSidebar }) => {
  const navigate = useNavigate();
  return (
    <div className='navbar'>
      <div className='logo-container'>
        <MdMenu className='menu-icon' size={28} onClick={() => setShowSidebar(prev => !prev)} />
        <img className='logo' src={assets.logo} alt="logo" onClick={() => navigate('/')} />
      </div>
      <img className='profile' src={assets.profile_image} alt="profile" />
    </div>
  )
}

export default Navbar
