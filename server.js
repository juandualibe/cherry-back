// server.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' })); // ← Aumentamos el límite para la migración
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => console.error('❌ Error conectando a MongoDB:', err));

// Rutas
const clientesRoutes = require('./routes/clientes');
const proveedoresRoutes = require('./routes/proveedores');
const verduleriaRoutes = require('./routes/verduleria');
const migracionRoutes = require('./routes/migracion'); // ← NUEVA

app.use('/api/clientes', clientesRoutes);
app.use('/api/proveedores', proveedoresRoutes);
app.use('/api/verduleria', verduleriaRoutes);
app.use('/api/migracion', migracionRoutes); // ← NUEVA

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    mensaje: '🍒 API de Cherry funcionando',
    endpoints: {
      clientes: '/api/clientes',
      proveedores: '/api/proveedores',
      verduleria: '/api/verduleria',
      migracion: '/api/migracion'
    }
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});