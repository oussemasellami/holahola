import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UsersService } from './service/users/users.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import { User } from './users/user.models';
import{ServeStaticModule} from '@nestjs/serve-static'
import {join } from 'path'

@Module({
  imports: [
        ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot:'/chat'
    }),

    TypeOrmModule.forRoot({
    type:'mongodb',
    host:'localhost',
    port:27017,
    database:'4twin82526',
    entities:[User],
    synchronize:true
  }),
    UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
