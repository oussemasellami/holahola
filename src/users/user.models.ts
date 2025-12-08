import { IsDate, isDate } from "class-validator";
import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

@Entity()
export class User{

    @AfterInsert()
    logInsert(){
        console.log('user inserted')
    }

    @AfterUpdate()
    logupdate(){
        console.log('user updated'+this.id)
    }

    @AfterRemove()
    logRemove(){
        console.log('user removed'+this.id)
    }
    
    @ObjectIdColumn()
    id:ObjectId

    @Column()
    username:string

    @Column()
    email:string

    @Column()
    status:string

    @Column()
    role:string
    @Column()
    @IsDate()
    createdat:Date
    @Column()
    @IsDate()
    updateddat:Date

}