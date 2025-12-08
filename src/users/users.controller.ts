import { Body, Controller, Get, Param, Post, Query,Headers, Patch, Delete, Put, InternalServerErrorException, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './CreateUser.dto';
import { UsersService } from 'src/service/users/users.service';
import { User } from './user.models';
import { ObjectId } from 'typeorm';
import { UserfilterInterceptor } from 'src/userfilter/userfilter.interceptor';


@UseInterceptors(UserfilterInterceptor)
@Controller('admin/users')
export class UsersController {
  constructor(private readonly userservice:UsersService){

  }



  @Get()
  showuser(){
    return this.handle(this.userservice.findall());
  }

   //UserDto=new CreateUserDto();
    users = [
    { id: 1, username: 'Mohamed', email: 'mohamed@esprit.tn', status: 'active' },
    { id: 2, username: 'Sarra', email: 'sarra@esprit.tn', status: 'inactive' },
    { id: 3, username: 'Ali', email: 'ali@esprit.tn', status: 'inactive' },
    { id: 4, username: 'Eya', email: 'eya@esprit.tn', status: 'active' },
    ]

@Get('hello')
showhello():string{
  return this.userservice.getshowhello();
}


    @Post('add')
    create(@Body() data,@Headers('authorization') authoruser:string){
      console.log("Authorization",authoruser)
      const newuser= {id:Date.now(),...data}
      this.users.push(newuser)
      return newuser

    }

    
    /*@Post('adddto')
    createDTO(@Body() body:CreateUserDto,@Headers('authorization') authoruser:string){
      console.log("Authorization",authoruser)

      const newuser= {id:Date.now(),...body}
      this.users.push(newuser)
      return newuser

    }*/


    @Patch(':id')
    update(@Param('id') id:number,@Body() data){
      //console.log("Authorization",authoruser)

        const userid=this.users.filter(u=>u.id ===Number(id))
        console.log('userid avant update:'+JSON.stringify(userid))
     if(userid.length>0){
      Object.assign(userid[0],data)
          return {message:"updated",user:userid[0]}
     }

    }


    @Delete(':id')
    deleteuser(@Param('id')id:number){
      const index=this.users.findIndex(u=>u.id ===Number(id))
      if(index!==-1){
        return this.users.splice(index,1)
      }

    }
    
     @Get('show')
  getshow(@Query('username') username:string) {
    if(username){
      return this.users.filter(u=>u.username ===username)
    }
    return this.users
  }


    @Get('show/:id')
  getshowbyid(@Param('id') id:number) {
    if(id){
      return this.users.filter(u=>u.id ===Number(id))
    }
    return this.users
  }


    @Get('active/:status')
  getstatus(@Param('status') status:string) {
    if(status){
      return this.users.filter(u=>u.status ===status)
    }
    //return this.users
  }


  /*********************crud Mongodb********************************** */
 //med hbib dhaouadi : 2pt
  private async handle<T>(promise:Promise<T> ):Promise<T>{
    try{
      return await promise;
    }catch{
      throw new InternalServerErrorException();
    }
  }

  

  @Post('addusermdb')
  createuser(@Body() data: Partial<CreateUserDto>){
    return this.userservice.createuser(data)

  }

  @Put('/updateusermdb/:id')
  updateuser(@Param('id') id:ObjectId,@Body() data:User){
    console.log('id :'+id)
    return this.userservice.updateuser(id,data)
  }
  @Delete('/deleteuser/:id')
  deleteusermdb(@Param('id') id:ObjectId){
    console.log('id :'+id)
    return this.userservice.deleteuser(id)
  }
}
