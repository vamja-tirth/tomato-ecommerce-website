import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import FoodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import contactRouter from "./routes/contactRoute.js";
import wishlistRouter from "./routes/wishlistRoute.js";
import { saveMessage, getMessages } from "./controllers/contactController.js";




//app config
const app = express()
const PORT = process.env.PORT || 4001;


//middleware
app.use(express.json())
app.use(cors())

// db connection
connectDB();

// api endpoint
app.use("/api/food", FoodRouter);
app.use("/images",express.static('uploads'));
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
app.use("/api/contact", contactRouter)
app.use("/api/wishlist", wishlistRouter)


app.get("/api/test", (req, res) => res.send("TEST WORKING"))




app.get("/",(req,res)=>{
    res.send("API WORKING")
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// nodemon restart trigger
