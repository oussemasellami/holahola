import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateUserDto{

    @IsString()
    //@IsOptional()
    @IsNotEmpty()
    username?:string

    @IsString()
    //@IsOptional()
    @IsNotEmpty({message:"email non vide"})
    email:string

    @IsString()
    //@IsOptional()
    @IsNotEmpty()
    status:string
}