import express from "express"
import cors from "cors"
import dotenv from 'dotenv';
import cookieParser from "cookie-parser"
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename);


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())
app.use('/uploads', express.static(join(__dirname, 'uploads')));


app.use(express.json())

import userRouter from './routes/userRoutes.js'
import postRouter from './routes/postRoutes.js'
import bookingRouter from './routes/bookingRoutes.js'

app.use("/api/v1/users", userRouter)
app.use("/api/v1/users", postRouter)
app.use("/api/v1/users", bookingRouter)

export { app }

