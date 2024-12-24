import express from "express";
import connectDB from "./db/index.js";
import dotenv from 'dotenv';
import { app } from './app.js'; 

dotenv.config();

const port = process.env.PORT || 3000; 

// Connect to MongoDB
connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`⚙️ Server is running at port : ${port}`);
        });
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    });