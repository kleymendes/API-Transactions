import { Request, Response, NextFunction } from 'express';

export const validationTypetransaction = (request : Request, response : Response, next : NextFunction) => {
    const {type} = request.body;
    
    if(type && type !== 'income' && type !== 'outcome' ){
        return response.status(400).send({message: 'Invalid type parameters'})
    }

    return next();
}