import jwt from 'jsonwebtoken';
import { jwtSecret } from './config.js';

const getUserDataFromReq = async (req) => {
    const { token } = req.cookies;
    return new Promise((resolve, reject) => {
        jwt.verify(token, jwtSecret, {}, (err, userData) => {
            if (err) return reject(err);
            resolve(userData);
        });
    });
};

export default getUserDataFromReq;