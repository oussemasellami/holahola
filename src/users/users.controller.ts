import { Controller, Get, Param, Query,Headers, Post, Body, Put, Delete, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UsersService } from './users/users.service';
import { ObjectId } from 'mongodb';
import { UserFilterInterceptor } from 'src/user-filter/user-filter.interceptor';

@UseInterceptors(UserFilterInterceptor)
@Controller('admin/users')
export class UsersController {




       @Get()
  async findAllusers() {
    return this.usersService.findAllmdb();
  }


    users = [
{ id: 1, username: 'Mohamed', email: 'mohamed@esprit.tn', status: 'active' },
{ id: 2, username: 'Sarra', email: 'sarra@esprit.tn', status: 'inactive' },
{ id: 3, username: 'Ali', email: 'ali@esprit.tn', status: 'inactive' },
{ id: 4, username: 'Eya', email: 'eya@esprit.tn', status: 'active' },
]

   @Get('auth-header')
  testAuthHeader(@Headers('authorization') authorization?: string) {
    if (!authorization) {
      return { message: 'No Authorization header provided' };
    }

    return { authorization };
  }

  @Post()
    create(@Body() data, @Headers('authorization') authHeader: string) {
    console.log('Authorization:', authHeader);
    console.log(data)
           const newUser = { id: Date.now(), username:data.username,email:data.email,status:data.status };
           console.log(newUser)
    this.users.push(newUser);
    return newUser;
    }

  @Post('add')
    createUSER(@Body() createUserDto: CreateUserDto, @Headers('authorization') authHeader: string){
    console.log('Authorization:', authHeader);
    const newUser = { id: Date.now(), ...createUserDto };
    this.users.push(newUser);
    return newUser;
    }

    @Get('/username')
    findAll(@Query('username') username: string) {
        if (username) {
            return this.users.filter(user => user.username === username);
        }
    return this.users;
    }



    @Get(':id')
    findOne(@Param('id') id: number){
    return this.users.find(user => user.id === Number(id));
    }




    //***************************************************************************** */

     constructor(private  usersService: UsersService) {}


  @Post('addMdb')
  createnewuser(@Body() body:{ email: string; password: string ;role:string }) {
    return this.usersService.create(body.email,body.password,body.role);
  }



  @Get('/mdb/:id')
  async findOneMDB(@Param('id') id: ObjectId) {
    return this.usersService.findOneById(id);
  }

  /*@Put(':id')
  updateMDB(@Param('id') id: string, @Body() body) {
    return this.usersService.update(id, body);
  }*/

  @Delete(':id')
  deleteMDB(@Param('id') id: ObjectId) {
    return this.usersService.remove(id);
  }



}
