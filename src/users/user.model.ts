import { Entity, ObjectIdColumn, Column, AfterRemove, AfterUpdate, AfterInsert } from 'typeorm';
import { IsString, IsEmail, IsBoolean, IsDate } from "class-validator";
import { ObjectId } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  @IsEmail()
  email: string;
 
  @Column()
  @IsString()
  password: string;

  @Column({ default: false })
  @IsBoolean()
  active: boolean;

  @Column()
  @IsString()
  role: string;

  @Column()
  @IsDate()
  createdAt: Date;

  @Column()
  @IsDate()
  updatedAt: Date;



  @AfterInsert()
    logInsert(){
        console.log('user added succesfully')
    }

    @AfterUpdate()
    logUpdate(){
        console.log('user updated succesfully')
    }

    @AfterRemove()
    logRemove(){
        console.log('user removed succesfully')
    }
}
