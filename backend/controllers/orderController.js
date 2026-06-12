import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// placing user order for frontend
const placeorder = async (req, res) => {
    try {
        const newOrder = new orderModel({
            userId: req.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.userId, { cartData: {} });

        const options = {
            amount: req.body.amount * 100, // amount in smallest currency unit (paise)
            currency: "INR",
            receipt: newOrder._id.toString()
        };

        const order = await razorpay.orders.create(options);

        res.json({ success: true, order: order, dbOrderId: newOrder._id });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// verify razorpay payment
const verifyOrder = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Payment Verified Successfully" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Invalid signature" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// user orders for frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// Listing orders for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// api for updating order status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

export { placeorder, verifyOrder, userOrders, listOrders, updateStatus };