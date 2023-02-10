import { NextFunction, Request, Response } from 'express';

export const validationDataTransaction = (request: Request , response: Response, next: NextFunction)=> {

    const {value, type, title} = request.body;

    if(!type || !value || !title){
        return response.status(400).send({message: 'Invalid parameters'})
    }

   return next() 
}