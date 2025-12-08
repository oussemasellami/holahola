import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.model';
import {  MongoRepository, Repository } from 'typeorm';
import { ObjectId } from 'typeorm';

@Injectable()
export class UsersService {


    constructor(@InjectRepository(User) private userRepository: MongoRepository<User>) {}

    async create(email: string, password: string,role:string): Promise<User> {
        try {
          const user = this.userRepository.create({ email, password, active: false,role });
          await this.userRepository.save(user);
          return user;
        } catch (error) {
          console.error("Error during save operation:", error);
          throw new InternalServerErrorException("Failed to create the user");
        }
    }

    async findAllmdb(): Promise<User[]> {
        try {
          const user = await this.userRepository.find({ 
                skip: (1 - 1) * 2, 
                take: 2 });




;
        console.log('*************'+user)
          return user;
        } catch (error) {
          console.error("Error during find operation:", error);
          throw new InternalServerErrorException('Failed to retrieve users');
        }
    }

  async findOneById(id: ObjectId ): Promise<User> {
  
 //const objectId = typeof id === 'string' ? new ObjectId(id) : id;
           //console.log("hhhhhhhhh"+_id)
           //console.log("hhhhhhhhh"+JSON.stringify(new ObjectId(_id)))
    const user= await this.userRepository.findOneBy(id);
   // if (!user) throw new NotFoundException(`User with id ${id} not found`)

    
         console.log("hhhhhhhhh"+user)
    
          return user;
       
    }  

    async findOneByEmail(email: string): Promise<User> {
        try {
          const user = await this.userRepository.findOneBy({ email });
          if (!user) {
            throw new NotFoundException(`User with email ${email} not found`);
          }
          return user;
        } catch (error) {
          console.error("Error during find operation:", error);
          throw new InternalServerErrorException('Failed to retrieve the user');
        }
    }

    async findActive(): Promise<User[]> {
        try {
          const users = await this.userRepository.find({ where: { active: true } });
          if (users.length === 0) {
            throw new NotFoundException('No active users found');
          }
          return users;
        } catch (error) {
          console.error("Error during find operation:", error);
          throw new InternalServerErrorException('Failed to retrieve active users');
        }

        
    }


async remove(_id: ObjectId): Promise<void> {
        try {
             console.log("********"+_id)
          await this.userRepository.delete(_id);
        } catch (error) {
          console.error("Error during remove operation:", error);
          throw new InternalServerErrorException('Failed to remove the user');
        }
    }




}
