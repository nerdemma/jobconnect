// src/server.ts
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import applicationRoutes from './routes/applications';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configuración de CORS para permitir solicitudes desde el Frontend
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:8080'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());

// Verificación de salud de la API
app.get('/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'OK', 
    service: 'DevMatch Midnight API',
    timestamp: new Date().toISOString()
  });
});

// Rutas principales
app.use('/api/applications', applicationRoutes);

// Middleware global para manejo de errores de Express
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('[Express Error Handler]:', err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message || 'Ocurrió un error inesperado en el servidor.'
  });
});

app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`🚀 Backend DevMatch listo en http://localhost:${PORT}`);
  console.log(`==================================================`);
});