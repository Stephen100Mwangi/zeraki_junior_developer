import { create, router as _router, defaults } from 'json-server';
import cors from 'cors'
const server = create();
const router = _router('db.json');
const middlewares = defaults();
import dotenv from 'dotenv'

dotenv.config();


server.use(middlewares);
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

server.use(router);
server.use(cors());
server.listen(8000, () => {
  console.log('JSON Server is running');
});

// {
//     "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
//   }

