import { generateToken} from '../utilities/token-generator.js';
import { getUser } from '../models/user.model.js';

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Faltan credenciales' });
    }
    const user = await getUser(email);
    if (!user) {
        console.log('Error: El email ingresado no se encuentra registrado');
        return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    if (password !== user.password) {
        console.log('Error: La constraseña ingresada es incorrecta');
        return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    const token = generateToken(user); // Generar token
    const msg = `¡${(user.gender == 'f') ? 'Benvenida' : 'Bienvenido'} ${user.name} ${user.surname}!`;
    console.log(`Mensaje: ${msg}`);
    return res.status(200).json({message:`${msg}`, token});

    // Ejemplo de usuario devuelto por la consulta a la base de datos
    // const user = {
    //     email: email,
    //     password: password,
    //     admin: false
    // };
    // Validar credenciales
    //if (email === user.email && password === default_user.password) {
    //    const token = generateToken(user); // Generar token
    //    return res.status(200).json({ token });
    //} else {
    //    return res.status(401).json({ error: 'Credenciales inválidas' });
    //}
}

export { login };