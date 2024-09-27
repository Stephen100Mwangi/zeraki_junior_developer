import {create, router as _router, defaults} from 'json-server';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config ();

const server = create ();
const router = _router ('db.json');
const middlewares = defaults ();

// Use default middlewares (logging, static file serving, etc.)
server.use (middlewares);

// Enable CORS
server.use (cors ());

// Set up the router (for db.json)
server.use (router);

// Listen on the environment-defined port or 8000
const PORT = process.env.PORT || 8000;
server.listen (PORT, () => {
  console.log (`JSON Server is running on port ${PORT}`);
});
