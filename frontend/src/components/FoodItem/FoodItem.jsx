import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const FoodItem = ({ id, name, price, description, image, averageRating }) => {

    const { cartItems, addToCart, removeFromCart, url, token, fetchFoodList, wishlistItems, addToWishlist, removeFromWishlist } = useContext(StoreContext);
    const navigate = useNavigate();
    const [hoverRating, setHoverRating] = useState(0);

    const inWishlist = wishlistItems && wishlistItems[id];

    const handleRating = async (ratingValue) => {
        if (!token) {
            toast.error("Please login to rate food items");
            return;
        }
        try {
            const response = await axios.post(url + "/api/food/rate", { foodId: id, rating: ratingValue }, { headers: { token } });
            if (response.data.success) {
                await fetchFoodList();
                toast.success("Rating submitted!");
            } else {
                toast.error(response.data.message || "Error submitting rating");
            }
        } catch (error) {
            console.error("Error rating food", error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }

    return (
        <div className='food-item'>
            <div className="food-item-img-container">
                <img className='food-item-image' onClick={() => navigate(`/food/${id}`)} src={url + "/images/" + image} alt="" style={{ cursor: 'pointer' }} />

                <div
                    className="wishlist-icon"
                    onClick={(e) => {
                        e.stopPropagation();
                        inWishlist ? removeFromWishlist(id) : addToWishlist(id);
                    }}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill={inWishlist ? "tomato" : "rgba(255, 255, 255, 0.7)"} stroke={inWishlist ? "tomato" : "#49557e"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </div>

                {!cartItems || !cartItems[id]
                    ? <img className='add' onClick={(e) => { e.stopPropagation(); addToCart(id); }} src={assets.add_icon_white} alt="" />
                    : <div className='food-item-counter' onClick={(e) => e.stopPropagation()}>
                        <img onClick={(e) => { e.stopPropagation(); removeFromCart(id); }} src={assets.remove_icon_red} alt="" />
                        <p>{cartItems[id]}</p>
                        <img onClick={(e) => { e.stopPropagation(); addToCart(id); }} src={assets.add_icon_green} alt="" />
                    </div>
                }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p onClick={() => navigate(`/food/${id}`)} style={{ cursor: 'pointer' }}>{name}</p>
                    <div className="food-item-stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span 
                                key={star}
                                className={`star-icon ${star <= (hoverRating || Math.round(averageRating || 0)) ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRating(star);
                                }}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                            >
                                &#9733;
                            </span>
                        ))}
                    </div>
                    <span className="rating-value">{averageRating ? averageRating.toFixed(1) : "0.0"}</span>
                </div>
                <p className="food-item-desc">{description}</p>
                <p className="food-item-price">₹{price}</p>
            </div>
        </div>
    )
}

export default FoodItem
