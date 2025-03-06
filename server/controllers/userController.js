import { User } from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

import { jwtSecret } from "../config.js"

const test = ((req, res) => {
    res.json('test ok');
})

const registerUser = (async (req, res) => {
    const { name, username, email, password } = req.body;

    if ([name, username, email, password].some((field) => !field || field.trim() === "")) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const hashedPassword = await bcryptjs.hash(password, 10);

        const newUser = await User.create({
            name,
            username,
            email,
            password: hashedPassword,
        });

        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Error registering user", error });
    }
})

const updateUser = async (req, res) => {
    const { token } = req.cookies;
    const { name, username, email } = req.body;

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) return res.status(403).json({ message: 'Unauthorized' });

        try {
            const userDoc = await User.findById(userData.id);
            if (!userDoc) return res.status(404).json({ message: 'User not found' });

            userDoc.set({ name, username, email });
            await userDoc.save();

            res.json({ message: 'User updated', userDoc });
        } catch (error) {
            console.error("Error updating user:", error);
            res.status(500).json({ message: "Error updating user", error });
        }
    });
};

const deleteUser = async (req, res) => {
    const { token } = req.cookies;

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) return res.status(403).json({ message: 'Unauthorized' });

        try {
            // Delete user's bookings
            await Booking.deleteMany({ user: userData.id });

            // Delete user's places
            const places = await Place.find({ owner: userData.id });
            for (const place of places) {
                await Booking.deleteMany({ place: place._id });
                await place.deleteOne();
            }

            // Delete user
            const userDoc = await User.findByIdAndDelete(userData.id);
            if (!userDoc) return res.status(404).json({ message: 'User not found' });

            res.clearCookie('token').json({ message: 'User deleted' });
        } catch (error) {
            console.error("Error deleting user:", error);
            res.status(500).json({ message: "Error deleting user", error });
        }
    });
};

const loginUser = (async (req, res) => {
    try {
        const { loginvalue, password } = req.body;

        if (!loginvalue) {
            return res.status(400).json({ message: "username or email is required" });
        }

        const user = await User.findOne({
            $or: [{ username: loginvalue }, { email: loginvalue }]
        });

        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }

        // Await the password comparison
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid user credentials" });
        }

        // Generate JWT token
        jwt.sign({
            username: user.username,
            email: user.email,
            id: user._id,
            // name: user.name
        }, jwtSecret, {}, (err, token) => {
            if (err) {
                return res.status(500).json({ message: 'Error generating token', error: err });
            }
            // Set the token in a cookie and send a response
            res.cookie('token', token, {
                httpOnly: true, // Prevents JavaScript from accessing the cookie
                secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                sameSite: 'Strict', // Adjust as necessary (Lax or None for cross-site)
            });
            return res.status(200).json({
                message: 'Login successful',
                user
            });
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: 'User  not logged in', error });
    }
})

const logoutUser = (async (req, res) => {
    res.clearCookie('token').json({ message: 'Logged out' });
})

const userProfile = (async (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const { name, username, email, _id } = await User.findById(userData.id)
            res.json({ name, username, email, _id });
        })
    } else {
        res.json(null)
    }
})

export {
    test,
    registerUser,
    updateUser,
    deleteUser,
    loginUser,
    logoutUser,
    userProfile
}