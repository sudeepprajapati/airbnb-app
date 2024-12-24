import express from "express"
import cors from "cors"
import dotenv from 'dotenv';

dotenv.config();


const app = express()


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json())

app.get('/test', (req, res) => {
    res.json('test ok');
});

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    res.json({name, email, password})
})


export { app }