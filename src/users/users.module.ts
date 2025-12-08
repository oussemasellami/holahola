import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from 'src/service/users/users.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.models';
import { ChatGateway } from './chat/chat.gateway';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
   providers: [ UsersService, ChatGateway],
})
export class UsersModule {}
