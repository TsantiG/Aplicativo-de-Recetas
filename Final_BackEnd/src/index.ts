import express from 'express';
import cors from 'cors'
import helmet from 'helmet';
import morgan from 'morgan';
import loginRoutes from './routes/login.route';
import recetasRoutes from './routes/recetas';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middlewares
app.use(cors())
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use('/api', loginRoutes);
app.use('/api', recetasRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
