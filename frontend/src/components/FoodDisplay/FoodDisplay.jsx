import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDiaplay = ({ category, setCategory, title }) => {

  const { food_list } = useContext(StoreContext)

  return (
    <div className='food-display' id='food-display'>
      <div className="food-display-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px' }}>
        <h2>{title || "Top dishes near you"}</h2>
        {category !== "All" && (
          <button
            className="back-btn"
            onClick={() => setCategory("All")}
          >
            &#8592; Back
          </button>
        )}
      </div>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if (category === "All" || category.toLowerCase() === item.category.toLowerCase()) {
            return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} averageRating={item.averageRating} ratings={item.ratings} />
          }

        })}
      </div>
    </div>
  )
}

export default FoodDiaplay
