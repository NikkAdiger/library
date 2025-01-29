import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';
import { UserStatus } from '../../../types/enums';

export class UserDto {
	@IsString()
	@IsOptional()
	firstName: string;

	@IsString()
	@IsOptional()
	lastName: string;

	@IsEnum(UserStatus)
	@IsOptional()
	status: UserStatus;

	@IsEmail()
	email: string;

	// Hashed password
	@IsString()
	password: string;

	@IsString()
	@IsOptional()
	role: string;
}

export class UpdateUserDto extends UserDto {
	@IsString()
	id: string;
}