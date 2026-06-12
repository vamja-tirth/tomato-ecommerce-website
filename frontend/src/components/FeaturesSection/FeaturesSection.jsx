import React from 'react';
import './FeaturesSection.css';
import { assets } from '../../assets/assets';

const FeaturesSection = () => {
  return (
    <div className='features-section' id='features-section'>
      <div className="features-left">
        <h2>Online Ordering System for Restaurants</h2>
        <p>
          Foodapp is an all-in-one, centralized online ordering system that helps
          restaurants to increase profits by providing direct sales channels,
          integrations, and alternate delivery options.
        </p>
        
        <ul className="features-list">
          <li>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="5.5" cy="17.5" r="2.5"></circle>
              <circle cx="18.5" cy="17.5" r="2.5"></circle>
              <path d="M15 6H5v11.5"></path>
              <path d="M15 6l4 3.5v8"></path>
              <path d="M21 9.5l-4-3.5"></path>
              <path d="M11 6v5h4"></path>
            </svg>
            <span>Delivery</span>
          </li>
          <li>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <span>Take-Away</span>
          </li>
          <li>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            <span>Table Ordering</span>
          </li>
          <li>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>Reservations</span>
          </li>
        </ul>
      </div>

      <div className="features-right">
        <img src={assets.app_mockup} alt="App Mockup" className="app-mockup-img" />
      </div>
    </div>
  );
};

export default FeaturesSection;
