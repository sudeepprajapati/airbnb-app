import { User } from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"


import getUserDataFromReq from "../getUserDataFromReq.js"
const test = ((req, res) => {
    res.json('Working...');
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
    try {
        const userData = await getUserDataFromReq(req);

        const userDoc = await User.findById(userData.id);
        if (!userDoc) return res.status(404).json({ message: 'User  not found' });

        const { name, username, email } = req.body;
        userDoc.set({ name, username, email });
        await userDoc.save();

        res.json({ message: 'User  updated', userDoc });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Error updating user", error });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userData = await getUserDataFromReq(req);

        const userDoc = await User.findByIdAndDelete(userData.id);
        if (!userDoc) return res.status(404).json({ message: 'User  not found' });

        res.clearCookie('token').json({ message: 'User  deleted' });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Error deleting user", error });
    }
};


const loginUser = async (req, res) => {
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
    }, 'your-hardcoded-secret', {}, (err, token) => {
        if (err) {
            return res.status(500).json({ message: 'Error generating token', error: err });
        }
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
        });
        return res.status(200).json({
            message: 'Login successful',
            user
        });
    });

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
        }, jwtSecret, {}, (err, token) => {
            if (err) {
                return res.status(500).json({ message: 'Error generating token', error: err });
            }
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
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
}

const logoutUser = (async (req, res) => {
    res.clearCookie('token').json({ message: 'Logged out' });
})

const userProfile = async (req, res) => {
    try {
        const userData = await getUserDataFromReq(req);
        const { name, username, email, _id } = await User.findById(userData.id);
        res.json({ name, username, email, _id });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: 'Error fetching user profile', error });
    }
}

export {
    test,
    registerUser,
    updateUser,
    deleteUser,
    loginUser,
    logoutUser,
    userProfile
}
