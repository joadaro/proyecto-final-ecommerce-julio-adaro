import jwt from 'jsonwebtoken';
import 'dotenv/config';

const secretKey = process.env.JWT_SECRET_KEY;

// Middleware para verificar el token JWT
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1];
    if (!token) { return res.status(401).json({ error: 'Token no proporcionado' }) }
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido' });
        }
        req.user = user;
        next();
    });
};

export { authenticateToken };