import express from "express"
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT

app.get('/test', (req, res) =>{
    res.json('test ok');
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


// import cors from "cors"
// import cookieParser from "cookie-parser"

// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }))

