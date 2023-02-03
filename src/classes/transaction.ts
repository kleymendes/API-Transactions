import { v4 as uuid} from 'uuid';

export interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome'
}

export class Transaction {
  private _id: string;
  private _title: string;
  private _value: number;
  private _type: 'income' | 'outcome';

  constructor(params: TransactionDTO){
    this._id = uuid()
    this._title = params.title;
    this._value = params.value;
    this._type = params.type
  }

  get id(){
    return this._id;
  }
  get title() {
    return this._title;
  }
  get value() {
    return this._value;
  }

  get type() {
    return this._type;
  }

  handleProperties() {
    return {
      id: this.id, 
      title: this.title, 
      value: this.value, 
      type: this.type, 
    }
  }
}


