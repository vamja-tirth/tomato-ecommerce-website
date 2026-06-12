import React, { useContext } from 'react'
import './Wishlist.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../../components/FoodItem/FoodItem'

const Wishlist = () => {
  const { food_list, wishlistItems } = useContext(StoreContext);

  const favoritedFoods = food_list.filter(item => wishlistItems[item._id]);

  return (
    <div className='wishlist'>
      <h2>Your Wishlist</h2>
      {favoritedFoods.length === 0 ? (
        <div className="wishlist-empty">
          <p>Your wishlist is empty. Start adding some delicious dishes!</p>
        </div>
      ) : (
        <div className="wishlist-display-list">
          {favoritedFoods.map((item, index) => {
            return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
          })}
        </div>
      )}
    </div>
  )
}

export default Wishlist
