import {Entity, PrimaryGeneratedColumn,Column} from 'typeorm';

@Entity('users')
export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({length:100})
    name: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string // stored hased password
 }

 /*
Purpose:
    Represents the database table structure.
    Defines how your User data is stored in the database.
    Used by TypeORM to create tables, insert data, query data, etc.
Where it’s used in the flow:
    UsersService injects it via @InjectRepository(User)
    Service methods use it to create(), save(), find() users in DB
    Database operations map to this entity
Think of it as the blueprint of the database table.    
 */
