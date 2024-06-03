import { create, router as _router, defaults } from 'json-server';
const server = create();
const router = _router('db.json');
const middlewares = defaults();

server.use(middlewares);
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

server.use(router);
server.listen(8000, () => {
  console.log('JSON Server is running');
});

