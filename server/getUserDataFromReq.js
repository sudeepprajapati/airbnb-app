import jwt from 'jsonwebtoken';

const jwtSecret = 'your-hardcoded-secret'; // Hardcoded secret for testing

const getUserDataFromReq = async (req) => {
    const { token } = req.cookies;
    return new Promise((resolve, reject) => {
        if (!token) {
            return reject(new Error('No token provided'));
        }
        jwt.verify(token, jwtSecret, {}, (err, userData) => {
            if (err) return reject(err);
            resolve(userData);
        });
    });
};

export default getUserDataFromReq;
