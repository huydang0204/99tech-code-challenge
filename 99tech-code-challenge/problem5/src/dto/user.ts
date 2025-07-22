import { IsEmail, IsNotEmpty, IsNumber, IsOptional, Min, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsNumber({}, { message: 'Age must be a number' })
  @Min(0, { message: 'Age must be a positive number' })
  age: number;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  email?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Age must be a number' })
  @Min(0, { message: 'Age must be a positive number' })
  age?: number;
}

export interface UserFilters {
    name?: string;
    email?: string;
    minAge?: number;
    maxAge?: number;
    limit?: number;
    offset?: number;
}