import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogModule } from './BlogModule/BlogModule';
import { Users } from './Models/UserModel';
import { Blog } from './Models/BlogModel';
import { UserModule } from './UserModule/UserModule'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'satao.db.elephantsql.com',
      port: 5432,
      username: 'kxfzmmnb',
      password: 'qh78SQyRZN94BEqQqgw3bkcJ2SaG9b_h',
      database: 'kxfzmmnb',
      entities: [Users, Blog],
    }),
    UserModule,
    BlogModule
  ]
})
export class AppModule { }
