// backend/server.js
import jsonServer from 'json-server';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from .env file
dotenv.config();

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'data', 'db.json'));
const middlewares = jsonServer.defaults();

// Apply default middlewares (logger, static files, etc.)
server.use(middlewares);

// Enable CORS using the `cors` package
server.use(cors());

// Use JSON Server router with API prefix
server.use('/api', router);

// Define the port to listen on, defaulting to 8000 if PORT isn't set
const PORT = process.env.PORT || 8000;

server.listen (PORT, '0.0.0.0', () => {
  console.log (`JSON Server is running on port ${PORT}`);
});

