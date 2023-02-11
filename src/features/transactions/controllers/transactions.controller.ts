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
                transactions: userTransactions.transactions.map((t) => t.handleProperties()), 
                balance: userTransactions.handleBalance()
            });

        }catch(error) {
            return response.status(400).send({
                message: error,
              });
        }
    }
    updateTransaction(request: Request, response: Response){
        try {
            const { id, idTransaction } = request.params;
            const { title, value, type } = request.body;

            const indexOfUser = listUsers.findIndex((user) => user.id === id);

            const indexOfTransaction = listUsers[indexOfUser].transactions.findIndex((transaction) => transaction.id === idTransaction)

            const oldTransaction = listUsers[indexOfUser].transactions[indexOfTransaction];

            listUsers[indexOfUser].transactions[indexOfTransaction].title = title ?? oldTransaction.title;
            listUsers[indexOfUser].transactions[indexOfTransaction].value = value ?? oldTransaction.value;
            listUsers[indexOfUser].transactions[indexOfTransaction].type = type ?? oldTransaction.type;
            
            return response.status(200).send({
                message: 'You were succesful in updating.', 
                updatedTransaction: listUsers[indexOfUser].transactions[indexOfTransaction]
            });


        } catch(error){
            return response.status(400).send({
                message: error,
              });
        }
    }
}