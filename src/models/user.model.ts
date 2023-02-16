import { Transaction } from './transaction.model';
import { v4 as uuid } from 'uuid';

export interface UserDTO {
  name: string;
  cpf: string;
  email: string;
  age: number;
}

export class User {
  private _id: string;
  name: string;
  cpf: string;
  email: string;
  age: number;
  transactions: Transaction[];

  constructor(params: UserDTO) {
    this.name = params.name;
    this.cpf = params.cpf;
    this.email = params.email;
    this.age = params.age;
    this.transactions = [];
    this._id = uuid();
  }

  get id() {
    return this._id;
  }

  handleProperties() {
    return {
      id: this.id,
      name: this.name,
      cpf: this.cpf,
      email: this.email,
      age: this.age,
    };
  }

  handleBalance() {
    let income = 0;
    let outcome = 0;

    this.transactions.map((transaction) => {
      if (transaction.type === 'income') {
        income += transaction.value;
      }

      if (transaction.type === 'outcome') {
        outcome += transaction.value;
      }
    });

    let total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }
}
