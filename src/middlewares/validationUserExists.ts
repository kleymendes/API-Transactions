import { NextFunction, Request, Response } from 'express';
import { listUsers } from '..';


export const validationUserExists = (request: Request, response: Response, next: NextFunction ) => {
    const { id } = request.params
    if (!id) {
        return response.status(400).json({ message: 'ID not found, bro' });
    }

    const user = listUsers.find((user) =>  user.id === id);

    if (!user) {
        return response.status(404).json({ message: 'User not found, bro' });
    }

    return next();
}