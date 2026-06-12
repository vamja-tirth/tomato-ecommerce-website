import React from 'react'
import './MobileApp.css'
import AppDownload from '../../components/AppDownload/AppDownload'

const MobileApp = () => {
  return (
    <div className='mobile-app-page'>
      <div className="mobile-app-intro">
        <h1>Download the Tomato App</h1>
        <p>Get the best out of Tomato with our mobile app. Enjoy exclusive discounts, real-time tracking, and lightning-fast delivery right at your fingertips!</p>
      </div>
      <AppDownload />
    </div>
  )
}

export default MobileApp
