import express, { Router } from 'express';
import { validationUserExists } from '../users/middlewares';
import { TransactionsController } from './controllers';
import { validationDataTransaction, validationTransactionExists, validationTypetransaction } from './middlewares';

const transactionRoutes = (router: Router) => {
    const transactionController = new TransactionsController();


    // POST - nova transação
    router.post(
        '/users/:id/transactions',
        validationUserExists,
        validationDataTransaction,
        validationTypetransaction,
        transactionController.createTransaction
    );

    //GET - by id
    router.get(
        '/users/:id/transactions/:idTransaction',
        validationUserExists,
        validationTransactionExists,
        transactionController.getTransactionById
    );
}

export { transactionRoutes };