// backend/server.js
import {create, router as _router, defaults} from 'json-server';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config ();

const server = create ();
const router = _router ('data/db.json');
const middlewares = defaults ();

// Apply default middlewares (logger, static files, etc.)
server.use (middlewares);

// Enable CORS using the `cors` package
server.use (cors ());

// Use JSON Server router
server.use (router);

// Define the port to listen on, defaulting to 8000 if PORT isn't set
const PORT = process.env.PORT || 8000;

server.listen (PORT, () => {
  console.log (`JSON Server is running on port ${PORT}`);
});
