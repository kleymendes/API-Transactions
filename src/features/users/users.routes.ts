import express, { Router } from 'express';
import { UserController } from './controllers';
import { CPFvalidator, validationData, validationUserExists } from './middlewares';

const userRoutes = (router: Router) => {
  const userController = new UserController();

  // POST
  router.post('/users', validationData, CPFvalidator, userController.createUser);

  // GET - ID - não pode mostrar a lista de transações
  router.get('/users/:id', validationUserExists, userController.getUserById);

  // GET USERS - query cpf, name, email
  router.get('/users', userController.getUsers);

  // PUT -
  router.put('/users/:id', validationUserExists, userController.updateUser);

  // DELETE - USER
  router.delete('/users/:id', validationUserExists, userController.deleteUser);
};

export { userRoutes };