import mongoose  from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/food-del").then(()=>console.log("DB Connected"))
        
    } catch (error) {
        console.log("DB Error:", error)
    }
}