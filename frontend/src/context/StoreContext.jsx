import axios from "axios";
import { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const StoreContext = createContext(null)

const StoreContextprovider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4001"
    const [token, setToken] = useState("")
    const [food_list, setFoodlist] = useState([])
    const [wishlistItems, setWishlistItems] = useState({});

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } })
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } })
        }
    }

    const addToWishlist = async (itemId) => {
        setWishlistItems((prev) => ({ ...prev, [itemId]: true }))
        if (token) {
            await axios.post(url + "/api/wishlist/add", { itemId }, { headers: { token } })
        }
    }

    const removeFromWishlist = async (itemId) => {
        setWishlistItems((prev) => {
            const updated = { ...prev };
            delete updated[itemId];
            return updated;
        })
        if (token) {
            await axios.post(url + "/api/wishlist/remove", { itemId }, { headers: { token } })
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item]
            }
        }
        return totalAmount
    }

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list")
        setFoodlist(response.data.data)
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } })
        setCartItems(response.data.cartData || {})
    }

    const loadWishlistData = async (token) => {
        const response = await axios.post(url + "/api/wishlist/get", {}, { headers: { token } })
        setWishlistItems(response.data.wishlistData || {})
    }

    useEffect(() => {

        async function loadData() {
            await fetchFoodList()
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"))
                await loadWishlistData(localStorage.getItem("token"))
            }
        }
        loadData()
    }, [])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url, setToken, token,
        wishlistItems,
        setWishlistItems,
        addToWishlist,
        removeFromWishlist,
        fetchFoodList
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextprovider