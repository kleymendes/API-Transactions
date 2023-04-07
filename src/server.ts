import express from 'express';
import { routesApp } from './config/routes';
import cors from 'cors';
import 'dotenv/config';
import "reflect-metadata";
import { AppDataSource } from './database/data-source';


const app = express();
app.use(cors());
app.use(express.json());

routesApp(app);

AppDataSource.initialize().then(() => {
    app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));
});

