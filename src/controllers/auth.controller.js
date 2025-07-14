import { generateToken} from '../utilities/token-generator.js';

const default_user = {
    id: 1,
    email: 'user@email.com',
    password: 'password123',
    role: 'user'
}

const login = (req, res) => {
    const { email, password } = req.body;
    // Validar que se envíen las credenciales
    if (!email || !password) {
        return res.status(400).json({ error: 'Faltan credenciales' });
    }
    // Simular un usuario por defecto
    const user = {
        id: default_user.id,
        email: default_user.email,
        role: default_user.role
    };
    // Validar credenciales
    if (email === default_user.email && password === default_user.password) {
        // Generar token
        const token = generateToken(default_user);
        return res.status(200).json({ message: 'Autenticación exitosa', token });
    } else {
        return res.status(401).json({ error: 'Credenciales inválidas' });
    }
}