import jwt from 'jsonwebtoken';
// Middleware para verificar el token JWT
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Formato: "Bearer <token>"
    if (!token) {
        return res.status(401).json({ message: 'No autorizado. Token no proporcionado.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mySuperSecretKey');
        // Asignar el userId al request
        req.userId = decoded.userId;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: 'No autorizado. Token inválido.' });
    }
};
export default authMiddleware;
