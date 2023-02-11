import express, { Router } from 'express';
import { validationUserExists } from '../users/middlewares';
import { TransactionsController } from './controllers';
import { validationDataTransaction, validationTransactionExists, validationTypetransaction } from './middlewares';

const transactionRoutes = (router: Router) => {
    const transactionController = new TransactionsController();


    // POST - new transaction
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

    //GET - by user all transactions and balance
    router.get(
        '/users/:id/transactions',
        validationUserExists,
        transactionController.getTransactionsByUser
    );

    // PUT - update transaction
    router.put(
        '/users/:id/transactions/:idTransaction',
        validationUserExists,
        validationTransactionExists,
        validationTypetransaction,
        transactionController.updateTransaction
    );

    // DELETE - delete transaction
    router.delete(
        '/users/:id/transactions/:idTransaction',
        validationUserExists,
        validationTransactionExists,
        transactionController.deleteTransaction
    );
}

export { transactionRoutes };