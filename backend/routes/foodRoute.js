import express from 'express'
import { addFood, listFood, removeFood, editFood, rateFood } from '../controllers/foodController.js'
import multer from 'multer' //img mate use thy
import authMiddleware from '../middleware/auth.js'

const foodRouter = express.Router();

// img storage

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`) // unique name mate
    }
})

const upload = multer({ storage: storage })

foodRouter.post("/add", upload.single("image"), addFood)
foodRouter.get("/list", listFood)
foodRouter.post("/remove", removeFood)
foodRouter.post("/edit", upload.single("image"), editFood)
foodRouter.post("/rate", authMiddleware, rateFood)



export default foodRouter;