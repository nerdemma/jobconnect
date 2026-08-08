// src/server.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import applicationRoutes from './routes/applications';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Montar rutas de la aplicación
app.use('/api/applications', applicationRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend DevMatch Midnight operativo.' });
});

app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`🚀 Servidor Express corriendo en http://localhost:${PORT}`);
  console.log(`==================================================`);
});