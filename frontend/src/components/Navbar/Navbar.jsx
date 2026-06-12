import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({ setShowLogin }) => {

    const [menu, setMenu] = useState("home")
    const [showSearch, setShowSearch] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")

    const { getTotalCartAmount, token, setToken, wishlistItems, food_list, url } = useContext(StoreContext)

    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("token");
        setToken("")
        navigate("/")
    }

    const filteredFoods = food_list.filter(item => 
        searchQuery && (
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            item.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    return (
        <div className='navbar'>
            <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
            <ul className="navbar-menu">
                <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
                <Link to='/menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</Link>
                <Link to='/mobile-app' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</Link>
                <Link to='/contact' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</Link>
            </ul>
            <div className="navbar-right">
                <div className="navbar-search">
                    {showSearch ? (
                        <div className="search-input-container">
                            <input 
                                type="text" 
                                placeholder="Search product..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                autoFocus
                            />
                            <img 
                                src={assets.cross_icon} 
                                alt="close" 
                                onClick={() => {
                                    setShowSearch(false);
                                    setSearchQuery("");
                                }} 
                            />
                            {searchQuery && (
                                <div className="search-dropdown">
                                    {filteredFoods.length > 0 ? (
                                        filteredFoods.map((item, index) => (
                                            <div 
                                                key={index} 
                                                className="search-dropdown-item"
                                                onClick={() => {
                                                    navigate(`/food/${item._id}`);
                                                    setShowSearch(false);
                                                    setSearchQuery("");
                                                }}
                                            >
                                                <img src={url + "/images/" + item.image} alt="" />
                                                <div>
                                                    <p>{item.name}</p>
                                                    <span>₹{item.price}</span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="search-dropdown-item no-result">No products found</div>
                                    )}
                                </div>
                            )}
                        </div>
                    ) : (
                        <img 
                            src={assets.search_icon} 
                            alt="search" 
                            onClick={() => setShowSearch(true)} 
                            style={{ cursor: 'pointer' }}
                        />
                    )}
                </div>
                <div className="navbar-search_icon">
                    <Link to='/wishlist'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#49557e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer' }}>
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </Link>
                    <div className={Object.keys(wishlistItems || {}).length === 0 ? "" : "dot"}></div>
                </div>
                <div className="navbar-search_icon">
                    <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>
                {!token ? <button onClick={() => setShowLogin(true)}>sign in</button> :
                    <div className='navbar-profile'>
                        <img src={assets.profile_icon} alt="" />
                        <ul className="nav-profile-dropdown">
                            <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                            <hr />
                            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                        </ul>
                    </div>
                }

            </div>
        </div>
    )
}

export default Navbar
