import React from 'react'
import { useNavigate } from 'react-router-dom'
import { menu_list } from '../../assets/assets'
import './CategoryGrid.css'

const CategoryGrid = () => {
    const navigate = useNavigate();

    return (
        <div className='category-grid-container'>
            <div className="category-grid">
                {menu_list.map((item, index) => {
                    return (
                        <div 
                            key={index} 
                            className="category-grid-item"
                            onClick={() => navigate('/menu', { state: { category: item.menu_name } })}
                        >
                            <img src={item.menu_image} alt={item.menu_name} className="category-bg-image" />
                            <div className="category-overlay"></div>
                            <h3 className="category-text">{item.menu_name}</h3>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default CategoryGrid
