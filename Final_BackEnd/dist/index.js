import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { initializeDB } from './config/db.js'; // Importar el inicializador de la base de datos
dotenv.config();
const app = express();
(async () => {
    // Inicializar la base de datos
    await initializeDB(); // Espera a que la base de datos esté conectada
    // Middlewares
    app.use(cors());
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(express.json());
    // Importar rutas después de inicializar la base de datos
    const loginRoutes = await import('./routes/login.route.js');
    app.use('/api', loginRoutes.default); // Usar rutas una vez que estén importadas
    // Iniciar el servidor
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
})();
