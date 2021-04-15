import { Connection, createConnection } from 'typeorm';
import { User } from '../Models/UserModel';


export class DBServices {

    async createDBConnection(): Promise<Connection> {
        return await createConnection();
    }

    async createUser(user: User): Promise<User> {
        // const connection = await createDBConnection();
        // const result = await connection.manager.save(user);
        return user;
    }


}