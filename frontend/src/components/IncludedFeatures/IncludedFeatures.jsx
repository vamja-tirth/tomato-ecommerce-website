import React from 'react';
import './IncludedFeatures.css';
import { assets } from '../../assets/assets';

const IncludedFeatures = () => {
    const features = [
        {
            title: "Mobile App",
            image: assets.inc_mobile_app
        },
        {
            title: "Web-shop",
            image: assets.inc_web_shop
        },
        {
            title: "Order Manager App",
            image: assets.inc_order_manager
        },
        {
            title: "Dashboard",
            image: assets.inc_dashboard
        },
        {
            title: "POS Printer",
            image: assets.inc_pos_printer
        },
        {
            title: "QR Menu",
            image: assets.inc_qr_menu
        }
    ];

    return (
        <div className='included-features' id='included-features'>
            <h2>What is included?</h2>
            <div className="included-features-grid">
                {features.map((feature, index) => (
                    <div key={index} className="included-feature-item">
                        <div className="img-container">
                            <img src={feature.image} alt={feature.title} />
                        </div>
                        <p>{feature.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default IncludedFeatures;
