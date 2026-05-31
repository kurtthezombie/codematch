import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  username: string;

  @IsOptional()
  role?: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
