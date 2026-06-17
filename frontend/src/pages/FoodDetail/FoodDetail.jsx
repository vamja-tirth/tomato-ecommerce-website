import React, { useContext, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
import './FoodDetail.css'

const FoodDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { food_list, cartItems, addToCart, removeFromCart, url, wishlistItems, addToWishlist, removeFromWishlist, token, fetchFoodList } = useContext(StoreContext);

  const [hoverRating, setHoverRating] = useState(0);

  const foodItem = food_list.find(item => item._id === id);

  if (!foodItem) {
    return <div className="food-detail-loading">Loading...</div>;
  }

  const inWishlist = wishlistItems && wishlistItems[id];

  const handleRating = async (ratingVal) => {
      if (!token) {
          toast.error("Please login to rate food items");
          return;
      }
      try {
          const response = await axios.post(url + "/api/food/rate", { foodId: id, rating: ratingVal }, { headers: { token } });
          if (response.data.success) {
              await fetchFoodList();
              toast.success("Rating submitted!");
          } else {
              toast.error(response.data.message || "Error submitting rating");
          }
      } catch (error) {
          toast.error("Error submitting rating");
      }
  }



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
            <div className="food-item-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span 
                        key={star} 
                        className={`star-icon ${star <= (hoverRating || Math.round(foodItem.averageRating || 0)) ? 'active' : ''}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleRating(star);
                        }}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                    >&#9733;</span>
                ))}
            </div>
            <span className="rating-value">{foodItem.averageRating ? foodItem.averageRating.toFixed(1) : "0.0"}</span>
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
