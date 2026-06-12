import React, { useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets'
import './FoodDetail.css'

const FoodDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { food_list, cartItems, addToCart, removeFromCart, url, wishlistItems, addToWishlist, removeFromWishlist } = useContext(StoreContext);

  const foodItem = food_list.find(item => item._id === id);

  if (!foodItem) {
    return <div className="food-detail-loading">Loading...</div>;
  }

  const inWishlist = wishlistItems && wishlistItems[id];

  return (
    <div className='food-detail-page'>
      <button className='back-btn' onClick={() => navigate(-1)}>
        &#8592; Back
      </button>
      <div className='food-detail-container'>
        <div className="food-detail-image-section">
          <img className='food-detail-image' src={url + "/images/" + foodItem.image} alt={foodItem.name} />
          <div
            className="food-detail-wishlist-icon"
            onClick={() => inWishlist ? removeFromWishlist(id) : addToWishlist(id)}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill={inWishlist ? "tomato" : "rgba(255, 255, 255, 0.7)"} stroke={inWishlist ? "tomato" : "#49557e"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </div>
        </div>
        <div className="food-detail-info-section">
          <h1 className="food-detail-title">{foodItem.name}</h1>
          <div className="food-detail-rating">
            <img src={assets.rating_starts} alt="Rating" />
            <span>(Customer reviews)</span>
          </div>
          <p className="food-detail-price">₹{foodItem.price}</p>
          <p className="food-detail-desc">{foodItem.description}</p>

          <div className="food-detail-add-cart">
            {!cartItems || !cartItems[id] ? (
              <button className="add-to-cart-btn" onClick={() => addToCart(id)}>Add to Cart</button>
            ) : (
              <div className='food-detail-counter'>
                <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="Remove" />
                <p>{cartItems[id]}</p>
                <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="Add" />
              </div>
            )}
          </div>

          <div className="food-detail-extra-info">
            <p><strong>Category:</strong> {foodItem.category}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FoodDetail
