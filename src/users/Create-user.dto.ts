import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: "Le nom d'utilisateur ne doit pas être vide" })
  username: string;

  @IsEmail()
  @IsNotEmpty({ message: "L'adresse email ne doit pas être vide" })
  email: string;

  @IsString()
  status: string;


  content: string;
}
