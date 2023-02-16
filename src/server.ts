import express from 'express';
import { routesApp } from './config/routes';

const app = express();
app.use(express.json());

routesApp(app);

app.listen('8080', () => console.log('Server is running on port 8080'));
