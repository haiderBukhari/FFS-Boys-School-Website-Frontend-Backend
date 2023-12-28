import mongoose from "mongoose";


const ContactScheme = mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    Subject: String,
    message: String,
    date: Date,
    viewed: {
        type: Boolean,
        default: false
    }
})

export const ContactModel = mongoose.model("Contact", ContactScheme);