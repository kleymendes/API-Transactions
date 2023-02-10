import { Request, Response, NextFunction } from 'express';
import { listUsers } from '..';

export const validationTransactionExists = (request: Request, response: Response, next: NextFunction) =>{
    const {id, idTransaction} = request.params;
    const indexUser = listUsers.findIndex((user)=> user.id === id);
    const exist = listUsers[indexUser].transactions.some((transaction) => transaction.id === idTransaction)
    
    if(!exist){
        return response.status(404).send({message: 'Transaction not found, bro'})
    }

    return next()  

}