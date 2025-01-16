import mongoose, { model } from "mongoose"

const userSchema = new mongoose.Schema({
    name: String,
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true, 
        index: true
    },
    email: {
        type: String,
        required: true,
        uniqure: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
}, { timestamps: true })

export const User = model("User", userSchema)