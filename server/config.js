import dotenv from 'dotenv';
dotenv.config();

if (!process.env.JWT_SECRET) {
    throw new Error('Missing required environment variable: JWT_SECRET');
}

export const jwtSecret = process.env.JWT_SECRET;