import { Module } from '@nestjs/common';
import { UserController } from './app.controller';
import { UserService } from './app.service';
import { DBServices } from './DBService/DBService';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, DBServices],
})
export class AppModule { }
