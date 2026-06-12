import contactModel from "../models/contactModel.js";

// Save contact message
const saveMessage = async (req, res) => {
    console.log("Contact Message Received:", req.body);
    const { name, email, message } = req.body;
    try {
        const newMessage = new contactModel({
            name,
            email,
            message
        });
        await newMessage.save();
        res.json({ success: true, message: "Message sent successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error saving message" });
    }
}

// Get all contact messages for admin
const getMessages = async (req, res) => {
    try {
        const messages = await contactModel.find({});
        res.json({ success: true, data: messages });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching messages" });
    }
}

export { saveMessage, getMessages };
