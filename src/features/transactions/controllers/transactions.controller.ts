import { Request, Response } from 'express';
import { listUsers } from '../../../database';
import { Transaction, User } from '../../../models';

export class TransactionsController {
    createTransaction(request: Request, response: Response){
        try{
            const {id} = request.params;
            const {title, type, value} = request.body;
            const indexUser = listUsers.findIndex((user) => user.id === id);

            const newTransaction = new Transaction({title, type, value});

            listUsers[indexUser].transactions.push(newTransaction);

            return response.status(200).send({ message: 'Transaction successfully added', transaction : newTransaction.handleProperties()});
            
        }catch(error){
            return response.status(400).send({
                message: error,
              });
        }
    }

    getTransactionById(request: Request, response: Response){
        try{
            const {id, idTransaction} = request.params;
            const indexUser = listUsers.findIndex((user) => user.id === id )
            const transaction = listUsers[indexUser].transactions.find((transaction) => transaction.id === idTransaction) as Transaction

            return response.status(200).send({transaction: transaction.handleProperties()})

        }catch(error){
            return response.status(400).send({
                message: error,
              });
        }
    }

    getTransactionsByUser(request: Request, response: Response) {
        try {
            const { id } = request.params;

            const userTransactions = listUsers.find((user) => user.id === id) as User;

            return response.status(200).send({ 
                transactions: userTransactions.transactions, 
                balance: userTransactions.handleBalance()
            })

        }catch(error) {
            return response.status(400).send({
                message: error,
              });
        }
    }
}