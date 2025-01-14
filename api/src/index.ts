import express, { Request, Response, NextFunction } from 'express';
import pool from './repository/db';
import clienteRoutes from './routes/clienteRoutes';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();
const port = process.env.PORT || 3000;

// Middleware para registrar logs de acesso às rotas
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(express.json());

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Clientes',
      version: '1.0.0',
      description: 'API para gerenciamento de produtos',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/models/*.ts', './src/dto/*.ts'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api', clienteRoutes);

// Tratamento de erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, async () => {
  try {
    await pool.getConnection();
    console.log('Connected to the database');
    console.log(`Server is running on http://localhost:${port}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
