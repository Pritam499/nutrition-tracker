/**
 * Main application file.
 *
 * This file sets up the Express server, connects to the database,
 * and mounts the API routes.
 *
 * @module app
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import path from 'path';
import routes from './routes/index.js';
import { connectDB } from './config/db.js';
import errorHandler from './middlewares/errorHandler.js';
import csurf from 'csurf';
import dotenv from 'dotenv';

dotenv.config();
const csrfProtection = csurf({ cookie: true });


const app = express();

// Enable CORS
// app.use(cors(
//   {
//     origin: process.env.CLIENT_URL,
//     credentials: true,
//   },
// ));

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173', // Fallback for development
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Enable Helmet security middleware
app.use(helmet({
  crossOriginOpenerPolicy: false,
}));

// Enable Gzip compression
app.use(compression());

// Parse JSON bodies
app.use(express.json());

// // Enable CSRF protection
// app.use(csrfProtection);

// Define error handler
app.use(errorHandler);

// Make uploaded assets accessible
// incase you want to access uploaded assets
app.use('/public', express.static(path.join('public'), { dotfiles: 'deny' }));

// Serve Swagger UI
// app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDocument));

// Disable the "X-Powered-By" header
app.disable('x-powered-by');

// Connect to the database
connectDB();

// Mount the API routes
app.use('/api', routes);

export default app;
