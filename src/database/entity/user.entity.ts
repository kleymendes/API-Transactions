import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TransactionEntity } from './transactions.entity';

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'varchar', length: 11, unique: true })
    cpf: string;

    @Column({ type: 'varchar', length: 100 })
    email: string;

    @Column({ type: 'int' })
    age: number;

    @OneToMany(() => TransactionEntity, (entity) => entity.users) // aponta pro atributo users la na table transactions
    transactions: TransactionEntity[];

    @Column({ type: 'date' })
    createdAt: Date;

    @Column({ type: 'date' })
    updatedAt: Date;
    
    constructor (
        id: string, 
        name: string, 
        cpf: string, 
        email: string, 
        age: number, 
        transactions: TransactionEntity[],
        createdAt: Date, 
        updatedAt: Date
    ){
        this.id = id;
        this.name = name;
        this.cpf = cpf;
        this.email = email;
        this.age = age;
        this.transactions = transactions; 
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}