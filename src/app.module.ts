import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.model';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    /*  type: 'mongodb',
      url: 'mongodb://localhost:27017/nestcrud',
      synchronize: true,
      //useUnifiedTopology: true,
            entities: [User],
     entities: [__dirname + '/.entity{.ts,.js}'],*/
     type: 'mongodb',               // Déclare que c'est MongoDB
      host: 'localhost',             // L'adresse de ton serveur MongoDB
      port: 27017,                  // Le port de MongoDB
      database: 'atelier-s45',              // Nom de la base de données
     // useNewUrlParser: true,         // Option de MongoDB
      //useUnifiedTopology: true,     // Option de MongoDB
      entities: [User],                 // Liste des entités
      synchronize: true,     // Synchroniser les entités avec la base de données
    }),

    UsersModule,
     ChatModule, 
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    serveRoot: '/chat',
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
