import { v4 as uuid } from 'uuid';

export interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

export class Transaction {
  private _id: string;
  title: string;
  value: number;
  type: 'income' | 'outcome';

  constructor(params: TransactionDTO) {
    this._id = uuid();
    this.title = params.title;
    this.value = params.value;
    this.type = params.type;
  }

  get id() {
    return this._id;
  }

  handleProperties() {
    return {
      id: this.id,
      title: this.title,
      value: this.value,
      type: this.type,
    };
  }
}
