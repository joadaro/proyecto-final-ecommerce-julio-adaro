import { generateToken} from '../utilities/token-generator.js';

const default_user = {
    id: 1,
    email: 'user@email.com',
    password: 'password123',
    admin: false
}

const login = (req, res) => { // Asincrónico???
    const { email, password } = req.body;
    // Validar que se envíen las credenciales
    if (!email || !password) {
        return res.status(400).json({ error: 'Faltan credenciales' });
    }
    // Simular una base de datos de usuarios
    // En un caso real, aquí se buscaría el usuario en la base de datos

    // Ejemplo de usuario devuelto por la consulta a la base de datos
    const user = {
        email: email,
        password: password,
        role: 'user' // Asignar un rol por defecto
    };
    // Validar credenciales
    if (email === default_user.email && password === default_user.password) {
        // Generar token
        const token = generateToken(user);
        return res.status(200).json({ token });
    } else {
        return res.status(401).json({ error: 'Credenciales inválidas' });
    }
}

export { login };