import express, { Application, Request, Response } from 'express';
import { transactionRoutes } from '../features/transactions/transactions.routes';
import { userRoutes } from '../features/users/users.routes';
import { initialPage } from './initialPage';

const routesApp = (app: Application) => {
  const router = express.Router();

  app.use('/', router);
  router.get('/', (request: Request, response: Response) => response.send(initialPage));

  // rotas da aplicação/features
  userRoutes(router);
  transactionRoutes(router);
};

export { routesApp };
