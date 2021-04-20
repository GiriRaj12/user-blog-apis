import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogModule } from './BlogModule/BlogModule';
import { Users } from './Models/UserModel';
import { Blog } from './Models/BlogModel';
import { UserModule } from './UserModule/UserModule';
import { UserTokenMiddleWare } from './usertoken.middleware';
import { AdminTokenMiddleware } from './admintoken.middleware';

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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserTokenMiddleWare)
      .forRoutes({ path: 'auth/user/adduser', method: RequestMethod.POST })

    consumer
      .apply(AdminTokenMiddleware)
      .forRoutes({ path: 'blog/addblog', method: RequestMethod.POST });
  }
}
