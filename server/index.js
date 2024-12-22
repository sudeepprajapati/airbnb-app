import express from "express"
import dotenv from 'dotenv';
dotenv.config();
import cors from "cors"


const app = express();
const port = process.env.PORT

app.use(express.json())
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.get('/test', (req, res) => {
    res.json('test ok');
});

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    res.json({name, email, password})
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});


