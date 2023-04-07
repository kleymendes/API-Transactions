import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import { UserEntity } from './user.entity';
import { TransactionsType } from './typesEnum.entity';


@Entity({ name: 'transactions' })
export class TransactionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: '100' })
  title: string;

  @Column({ type: 'float' })
  value: number; 

  @Column({ type: 'enum', enum: TransactionsType })
  type: TransactionsType;

  @ManyToOne(() => UserEntity, (entity) => entity.transactions)
  @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
  users: UserEntity;
  
  @Column({ type: 'date' })
  createdAt: Date;

  @Column({ type: 'date' })
  updatedAt: Date;

    constructor(
        id: string, 
        title: string, 
        value: number, 
        type: TransactionsType, 
        users: UserEntity,
        createdAt: Date, 
        updatedAt: Date
        
    ) {
        this.id = id;
        this.title = title;
        this.value = value;
        this.type = type;
        this.users = users;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
};