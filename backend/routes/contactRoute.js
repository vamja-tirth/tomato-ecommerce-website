import express from "express";
import { saveMessage, getMessages } from "../controllers/contactController.js";

const contactRouter = express.Router();

contactRouter.post("/save", saveMessage);
contactRouter.get("/list", getMessages);

export default contactRouter;
