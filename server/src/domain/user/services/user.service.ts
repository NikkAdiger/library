import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDto, UpdateUserDto } from '../dto/user.dto';
import UserRepository from '../repositories/user.repository';
import { UserEntity } from '../entities/user.entity';
import { UserStatus } from '../../../types/enums';
import * as bcrypt from 'bcrypt';
import Constants from '../../../types/constants';

@Injectable()
export class UserService {

	constructor(
		private userRepository: UserRepository,
	) {}

	async create(createUserDto: UserDto) {
		const userEntity: Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'> = {
			firstName: createUserDto.firstName || null,
			lastName: createUserDto.lastName || null,
			password: createUserDto.password,
			role: createUserDto.role || 'user',
			email: createUserDto.email,
			status: createUserDto.status || UserStatus.ACTIVE,
		};

		const hashedPassword = await this.getHashedPassword(userEntity.password);
		userEntity.password = hashedPassword;

		return await this.userRepository.create(userEntity);
	}

	async findOne(id: string) {
		return await this.userRepository.findOne(id);
	}

	async findByEmail(email: string): Promise<UserEntity> {
		return this.userRepository.findByEmail(email);
	}

	async findAllPaginated(page: number, limit: number): Promise<{
		data: UserEntity[];
		total: number;
		page: number;
		limit: number;
	}> {
		return await this.userRepository.findAndCount(page, limit);
	}

	async update(updateUserDto: UpdateUserDto): Promise<UserEntity> {
		const existingUser = await this.userRepository.findOne(updateUserDto.id);

		if (!existingUser) {
			throw new NotFoundException(`User with ID ${updateUserDto.id} not found`);
		}

		const updatedArgs = this.getUpdatedArgs(updateUserDto);

		const updatedUser: Partial<UserEntity> = {
			...existingUser,
			...updatedArgs,
		};

		return await this.userRepository.update(updatedUser as UserEntity);
	}

	private getUpdatedArgs(updateUserDto: UpdateUserDto): Partial<UserEntity> {
		const updatedArgs: Partial<UserEntity> = {};

		if (updateUserDto.firstName !== undefined) {
			updatedArgs.firstName = updateUserDto.firstName;
		}

		if (updateUserDto.lastName !== undefined) {
			updatedArgs.lastName = updateUserDto.lastName;
		}

		if (updateUserDto.password !== undefined) {
			updatedArgs.password = updateUserDto.password;
		}

		if (updateUserDto.email !== undefined) {
			updatedArgs.email = updateUserDto.email;
		}

		if (updateUserDto.status !== undefined) {
			updatedArgs.status = updateUserDto.status;
		}

		return updatedArgs;
	}

	private async getHashedPassword(password: string): Promise<string> {
		const salt = await bcrypt.genSalt(Constants.SALT_ROUNDS);
		const hashedPassword = await bcrypt.hash(password, salt);

		return hashedPassword;
	}
}