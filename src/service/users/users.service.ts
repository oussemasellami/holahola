import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/CreateUser.dto';
import { User } from 'src/users/user.models';
import { MongoRepository, ObjectId } from 'typeorm';

@Injectable()
export class UsersService {

    getshowhello():string{
        return "hello 4twin8"
    }

    constructor(@InjectRepository(User) private readonly userRepository:MongoRepository<User>){}
/***salim hizi:2pt */
    async createuser(data:Partial<CreateUserDto>){
      try{     
        if(!data){      
             throw new NotFoundException
        }
           const usernew= await this.userRepository.create(data)
        return await this.userRepository.save(usernew)
      }catch(error){
        console.log('erreur'+error.message)
        throw new InternalServerErrorException
      };
    

    }
// youssef dhib :2pt//
    async findall():Promise<User[]>{
        try{        
            const user =await this.userRepository.find()
            if(user.length==0) throw new NotFoundException()
                return user;
              


}catch(error){
    throw new InternalServerErrorException(error.message)
}
    }

     async finonebyid(id:ObjectId):Promise<User | null>{

        try{ 
            const user=await this.userRepository.findOneBy(id)

            if(!user) throw new NotFoundException()

            return  user


        }catch(error){

            throw new InternalServerErrorException(error.message)
        }
       
    }
//takoua naceur : 2pts 
     async updateuser(id:ObjectId,data:User):Promise<User | null>{
        try{
              const user=await this.userRepository.findOneBy(id)
                 if(!user){
                throw new NotFoundException()
            }
              //const res= await this.userRepository.create(id,data)
            const res= await this.userRepository.update(id,data)
       
             return  await this.userRepository.findOneBy(id)
        }catch(error){
             throw new InternalServerErrorException(error.message)
        }
          
       
    }
//med aziz logtari : 2pts
      async deleteuser(id:ObjectId):Promise<string>{
        try{
             const user=await this.userRepository.findOneBy(id)
               if(!user){
            throw new NotFoundException()
           }
           const res=await this.userRepository.remove(user)
         
           return'user deleted';
        }catch(error){
            throw new InternalServerErrorException(error.message)
        }
    }


}
