import userModel from "../models/userModel.js"

//add item to wishlist
const addToWishlist = async (req, res) => {
    try {
        let userData = await userModel.findById(req.userId);
        let wishlistData = userData.wishlistData || {};

        wishlistData[req.body.itemId] = true;

        await userModel.findByIdAndUpdate(req.userId, { wishlistData });

        res.json({ success: true, message: "Added to Wishlist" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error adding to wishlist" });
    }
};

//remove item from wishlist
const removeFromWishlist = async (req, res) => {
    try {
        let userData = await userModel.findById(req.userId);
        let wishlistData = userData.wishlistData || {};

        if (wishlistData[req.body.itemId]) {
            delete wishlistData[req.body.itemId];
        }

        await userModel.findByIdAndUpdate(req.userId, { wishlistData });

        res.json({ success: true, message: "Removed from Wishlist" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error removing from wishlist" });
    }
};

//fetch user wishlist data
const getWishlist = async (req, res) => {
    try {
        let userData = await userModel.findById(req.userId);
        let wishlistData = userData.wishlistData || {};

        res.json({ success: true, wishlistData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching wishlist" });
    }
};

export { addToWishlist, removeFromWishlist, getWishlist }
