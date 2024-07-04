import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  name: string;
  @IsString()
  password: string;
}
