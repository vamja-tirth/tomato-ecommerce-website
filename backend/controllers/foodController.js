import { log } from "console";
import foodModel from "../models/foodModel.js";
import fs from 'fs'


//add food item

const addFood = async (req, res) => {

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })
    try {
        await food.save();
        res.json({ success: true, message: "Food Added" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}

// list food

const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({})
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}


//remove food

const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`, () => { })

        await foodModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Food Removed" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}



const editFood = async (req, res) => {
    try {
        const id = req.body.id;
        let updateData = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
        };

        if (req.file) {
            let image_filename = `${req.file.filename}`;
            updateData.image = image_filename;

            // Optional: delete old image
            const food = await foodModel.findById(id);
            if (food && food.image) {
                fs.unlink(`uploads/${food.image}`, () => { });
            }
        }

        await foodModel.findByIdAndUpdate(id, updateData);
        res.json({ success: true, message: "Food Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

const rateFood = async (req, res) => {
    try {
        const { foodId, rating } = req.body;
        const userId = req.userId; // From authMiddleware

        if (!userId) {
            return res.json({ success: false, message: "User ID not found. Please login again." });
        }

        const food = await foodModel.findById(foodId);
        if (!food) {
            return res.json({ success: false, message: "Food not found" });
        }

        // Ensure ratings array exists
        if (!food.ratings) {
            food.ratings = [];
        }

        // Check if user already rated
        const existingRatingIndex = food.ratings.findIndex(r => r.userId === userId);
        if (existingRatingIndex >= 0) {
            food.ratings[existingRatingIndex].rating = rating;
        } else {
            food.ratings.push({ userId, rating });
        }

        // Calculate average rating
        const totalRatings = food.ratings.length;
        if (totalRatings > 0) {
            const sumRatings = food.ratings.reduce((acc, curr) => acc + curr.rating, 0);
            food.averageRating = sumRatings / totalRatings;
        } else {
            food.averageRating = 0;
        }

        food.markModified('ratings');
        await food.save();
        res.json({ success: true, message: "Food Rated", averageRating: food.averageRating });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


export { addFood, listFood, removeFood, editFood, rateFood }