import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const secretKey = process.env.JWT_SECRET_KEY;

// Genera un token JWT
const generateToken = (userData) => {
    const user = {
        id: userData.id,
        email: userData.email,
        role: userData.role
    };
    const expiration = { expiresIn: '1h' };
    return jwt.sign(user, secretKey, expiration);
}

export { generateToken };