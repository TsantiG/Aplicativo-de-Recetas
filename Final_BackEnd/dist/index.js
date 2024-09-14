import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { initializeDB } from './config/db.js';
dotenv.config();
const app = express();
(async () => {
    // Inicializar la base de datos
    await initializeDB();
    // Middlewares
    app.use(cors());
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(express.json());
    // Importar rutas después de inicializar la base de datos
    const loginRoutes = await import('./routes/login.route.js');
    app.use('/api', loginRoutes.default);
    const img = await import('./routes/imges.route.js');
    app.use('/api/upload', img.default);
    const recetasRoutes = await import('./routes/recetas.route.js');
    app.use('/api/recetas', recetasRoutes.default);
    const compartir = await import('./routes/compartir.route.js');
    app.use('/api/compartir', compartir.default);
    const comentar = await import('./routes/comentar.route.js');
    app.use('/api/comentar', comentar.default);
    const calificar = await import('./routes/calificar.route.js');
    app.use('/api/calificar', calificar.default);
    // Iniciar el servidor
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
})();
