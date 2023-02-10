import express, { Request, Response } from 'express';
import { User } from './classes';
import { UserController } from './controller';
import { validationUserExists, CPFvalidator, validationData } from './middlewares';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (request: Request, response: Response) => {
  return response.send('<h1>Gabriel</h1>');
});

/* USUARIO */

export const listUsers: Array<User> = [];
const userController = new UserController()

// POST
app.post('/users', validationData, CPFvalidator, userController.createUser);

// GET - ID - não pode mostrar a lista de transações
app.get('/users/:id', validationUserExists, userController.getUserById);

// GET USERS - query cpf, name, email
app.get('/users', userController.getUsers);

// PUT - 
app.put('/users/:id', validationUserExists, userController.updateUser)


// DELETE - USER






/* TRANSAÇÕES */

app.listen(8080, () => console.log('Servidor rodando'));
