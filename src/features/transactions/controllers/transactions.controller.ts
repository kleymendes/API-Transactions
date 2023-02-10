import { Request, Response } from 'express';
import { listUsers } from '../../../database';
import { Transaction } from '../../../models';

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
}