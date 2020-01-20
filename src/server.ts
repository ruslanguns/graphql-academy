
import express from 'express';
import compression from 'compression';
import cors from 'cors';
import { createServer } from 'http';

const app = express();

app.use('*', cors());
app.use(compression());

app.get('/', (req, res) => {
    res.send('Hola a la academia online de GraphQL');
});

const httpServer = createServer(app);
const port = 5200;

httpServer.listen({ port }, () => console.log(`Servidor listo en http://localhost:${port}`));
