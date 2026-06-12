import React from 'react';
import './GuaranteeSection.css';

const GuaranteeSection = () => {
    const guarantees = [
        {
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.66 10.46l-4.2-4.2a2.82 2.82 0 0 0-4 0l-3.2 3.2-4.2-4.2a2.82 2.82 0 0 0-4 0 2.82 2.82 0 0 0 0 4l9.2 9.2a2.82 2.82 0 0 0 4 0l3.2-3.2 4.2 4.2a2.82 2.82 0 0 0 4 0 2.82 2.82 0 0 0 0-4.04v.04z"></path>
                </svg>
            ),
            title: 'Creating "Loyal" Customers!',
            desc: 'Our team will help you to convert your clients to order from your own app and website.'
        },
        {
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="6" width="20" height="12" rx="2" ry="2"></rect>
                    <circle cx="12" cy="12" r="2"></circle>
                    <path d="M6 12h.01M18 12h.01"></path>
                </svg>
            ),
            title: 'Increasing your profits',
            desc: 'With our flexible payment methods, we always guarantee that you will make extra profit by working with us.'
        },
        {
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    <path d="M14.05 2a9 9 0 0 1 8 7.94"></path>
                    <path d="M14.05 6A5 5 0 0 1 18 10"></path>
                </svg>
            ),
            title: '24/7 Personal Assistance',
            desc: 'We will assign a personal support staff for you and you can contact them whenever you need.'
        },
        {
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                    <circle cx="12" cy="13" r="4"></circle>
                </svg>
            ),
            title: 'Making your brand visible',
            desc: 'Our marketing packages will help you to making your brand visible online and we will attract new customers.'
        },
        {
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                </svg>
            ),
            title: 'Flexible contracts',
            desc: "Don't worry about long contracts and hidden charges. We are flexible and we work as long as you are happy."
        },
        {
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
            ),
            title: 'All-in-One Platform',
            desc: 'We will help you by integrating your system with marketplaces, POS vendors and payment channels.'
        }
    ];

    return (
        <div className="guarantee-section">
            <div className="guarantee-content">
                <h2>We guarantee!</h2>
                <div className="guarantee-grid">
                    {guarantees.map((item, index) => (
                        <div key={index} className="guarantee-card">
                            <div className="guarantee-icon">
                                {item.icon}
                            </div>
                            <div className="guarantee-info">
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GuaranteeSection;
