import { Request, Response } from 'express';
import { listUsers } from '../../../database';
import { User } from '../../../models';

export class UserController {
  createUser(request: Request, response: Response) {
    try {
      const { name, cpf, email, age } = request.body;

      const newCPF = cpf.replace(/[^a-zA-Z0-9]/g, '');

      const newUser = new User({ name, cpf: newCPF, email, age });

      listUsers.push(newUser);

      console.log(listUsers);

      return response.status(201).json({
        body: newUser.handleProperties(),
        message: 'User created sucessfull, bro',
      });
    } catch (error) {
      return response.status(400).send({
        message: error,
      });
    }
  }

  getUsers(request: Request, response: Response) {
    try {
      const { name, email, cpf } = request.query;

      const users = listUsers.filter((user) => {
        if (name && email && cpf) {
          return (
            user.name.includes(name as string) &&
            user.cpf.includes(cpf as string) &&
            user.email.includes(email as string)
          );
        }

        if (name || email || cpf) {
          return (
            user.name.includes(name as string) ||
            user.cpf.includes(cpf as string) ||
            user.email.includes(email as string)
          );
        }

        return true;
      });

      return response.status(201).json({
        users: users.map((user) => user.handleProperties()),
        message: 'its list, bro',
      });
    } catch (error) {
      return response.status(400).send({
        message: error,
      });
    }
  }

  getUserById(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const user = listUsers.find((user) => user.id === id) as User;

      return response
        .status(201)
        .json({ user: user.handleProperties(), message: 'its list, bro' });
    } catch (error) {
      return response.status(400).send({
        message: error,
      });
    }
  }

  updateUser(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { name, email, cpf, age } = request.body;

      const newCPF = cpf.replace(/[^a-zA-Z0-9]/g, '');

      const userIndex = listUsers.findIndex((user) => user.id === id);

      listUsers[userIndex].name = name ?? listUsers[userIndex].name;
      listUsers[userIndex].email = email ?? listUsers[userIndex].email;
      listUsers[userIndex].cpf = newCPF ?? listUsers[userIndex].cpf;
      listUsers[userIndex].age = age ?? listUsers[userIndex].age;

      return response.status(200).json({
        user: listUsers[userIndex].handleProperties(),
        message: 'its list, bro',
      });
    } catch (error) {
      return response.status(400).send({
        message: error,
      });
    }
  }

  deleteUser(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const userIndex = listUsers.findIndex((user) => user.id === id);

      listUsers.splice(userIndex, 1);
      return response.status(200).send({ message: 'Delete with success bro!' });
    } catch (error) {
      return response.status(400).send({
        message: error,
      });
    }
  }
}