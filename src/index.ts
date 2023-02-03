import express, { Request, Response } from 'express';
import { User } from './classes';
import { validationUserExists, CPFvalidator, validationData } from './middlewares';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (request: Request, response: Response) => {
  return response.send('<h1>Gabriel</h1>');
});

/* USUARIO */

export const listUsers: Array<User> = [];

// POST

app.post('/users', validationData, CPFvalidator, (request: Request, response: Response) => {
  const { name, cpf, email, age } = request.body;

  const newCPF = cpf.replace(/[^a-zA-Z0-9]/g, '');

  const newUser = new User({ name, cpf: newCPF, email, age })
  listUsers.push(newUser);

  console.log(listUsers);


  return response
    .status(201)
    .json({
      body: newUser.handleProperties(),
      message: 'User created sucessfull, bro',
    });
});

// GET - ID - não pode mostrar a lista de transações
app.get('/users/:id', validationUserExists,(request: Request, response: Response) => {
  const { id } = request.params
 
  const user = listUsers.find((user) =>  user.id === id) as User;

  return response
    .status(201)
    .json({ user: user.handleProperties(), message: 'its list, bro' });
});


// GET USERS - query cpf, name, email
app.get('/users', (request: Request, response: Response) => {
  const { name, email, cpf } = request.query 

  

  const users = listUsers.filter((user) => {
    if(name && email && cpf) {
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

    return user
  })
    
    
    
    return response
    .status(201)
    .json({ users: users.map((user) => user.handleProperties()) , message: 'its list, bro' });

})

// PUT - 
app.put('/users/:id', validationUserExists, (request: Request, response: Response) => {
    const { id } = request.params
    const { name, email, cpf, age } = request.body

    const userIndex = listUsers.findIndex(user => user.id === id);

    listUsers[userIndex].name = name ?? listUsers[userIndex].name;
    listUsers[userIndex].email = email ?? listUsers[userIndex].email;
    listUsers[userIndex].cpf = cpf ?? listUsers[userIndex].cpf;
    listUsers[userIndex].age = age ?? listUsers[userIndex].age;

    return response.status(200).json({ user: listUsers[userIndex].handleProperties() , message: 'its list, bro' });
})

// DELETE - USER





/* TRANSAÇÕES */

app.listen(8080, () => console.log('Servidor rodando'));
