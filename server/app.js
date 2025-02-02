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

app.use("/api/v1/users", userRouter)
app.use("/api/v1/users", postRouter)


// app.get('/test', (req, res) => {
//     res.json('test ok');
// });

// app.post('/register', async (req, res) => {
//     const { name, username, email, password } = req.body;

//     try {
//         const hashedPassword = await bcryptjs.hash(password, 10);

//         const newUser = await User.create({
//             name,
//             username,
//             email,
//             password: hashedPassword,
//         });

//         res.status(201).json(newUser);
//     } catch (error) {
//         console.error("Error registering user:", error);
//         res.status(500).json({ message: "Error registering user", error });
//     }
// });

// app.post('/login', async (req, res) => {
//     try {
//         const { loginvalue, password } = req.body;

//         if (!loginvalue) {
//             return res.status(400).json({ message: "username or email is required" });
//         }

//         const user = await User.findOne({
//             $or: [{ username: loginvalue }, { email: loginvalue }]
//         });

//         if (!user) {
//             return res.status(404).json({ message: "User does not exist" });
//         }

//         // Await the password comparison
//         const isPasswordValid = await bcryptjs.compare(password, user.password);
//         if (!isPasswordValid) {
//             return res.status(401).json({ message: "Invalid user credentials" });
//         }

//         // Generate JWT token
//         jwt.sign({
//             username: user.username,
//             email: user.email,
//             id: user._id,
//             // name: user.name
//         }, jwtSecret, {}, (err, token) => {
//             if (err) {
//                 return res.status(500).json({ message: 'Error generating token', error: err });
//             }
//             // Set the token in a cookie and send a response
//             res.cookie('token', token, {
//                 httpOnly: true, // Prevents JavaScript from accessing the cookie
//                 secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
//                 sameSite: 'Strict', // Adjust as necessary (Lax or None for cross-site)
//             });
//             return res.status(200).json({
//                 message: 'Login successful',
//                 user
//             });
//         });
//     } catch (error) {
//         console.error("Login error:", error);
//         return res.status(500).json({ message: 'User  not logged in', error });
//     }
// });

// app.get('/profile', (req, res) => {
//     const { token } = req.cookies;
//     if (token) {
//         jwt.verify(token, jwtSecret, {}, async (err, userData) => {
//             if (err) throw err;
//             const { name, email, _id } = await User.findById(userData.id)
//             res.json({name, email, _id});
//         })
//     } else {
//         res.json(null)
//     }
//     // res.json({ token })
// })

export { app }

// app.post('/login', async (req, res) => {
// try {
// const { email, password } = req.body
//
// const user = await User.findOne({ email })
// if (!user) {
// throw new Error(404, "User does not exist")
// }
//
// const isPasswordValid = bcryptjs.compare(password, user.password)
// if (!isPasswordValid) {
// throw new Error(401, "Invalid user credentials")
// }
//
// jwt.sign({ email: user.email, id: user._id }, jwtSecret, {}, (err, token) => {
// if (err) throw err;
// res.cookie('token', token), json('pass ok')
// })
// } catch (error) {
// throw new Error("User not logged in");
// }
// 
// })

