import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDto, UpdateUserDto } from '../dto/user.dto';
import UserRepository from '../repositories/user.repository';
import { UserEntity } from '../entities/user.entity';
import { UserStatus } from '../types/enums';
import * as bcrypt from 'bcrypt';
import Constants from '../../../types/constants';
import { IUser } from '../types/interfaces';

@Injectable()
export class UserService {

	constructor(
		private userRepository: UserRepository,
	) {}

	async create(createUserDto: UserDto): Promise<IUser | null> {
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

		const newUser = await this.userRepository.create(userEntity);

		if (!newUser) {
			return null;
		}

		return this.mapToUserDTO(newUser);
	}

	async findOne(id: string): Promise<IUser | null> {
		const user = await this.userRepository.findOne(id);

		if (!user) {
			return null;
		}

		return this.mapToUserDTO(user);
	}

	async findByEmail(email: string): Promise<IUser | null> {
		const user = await this.userRepository.findByEmail(email);

		if (!user) {
			return null;
		}

		return this.mapToUserDTO(user);
	}

	async getUserWithHashPasswordByEmail(email: string): Promise<UserEntity> {
		return await this.userRepository.findByEmail(email);
	}

	async findAllPaginated(page: number, limit: number): Promise<{
		data: IUser[];
		total: number;
		page: number;
		limit: number;
	}> {
		const res = await this.userRepository.findAndCount(page, limit);

		res.data?.map(user => this.mapToUserDTO(user));

		return res;
	}

	async update(updateUserDto: UpdateUserDto): Promise<IUser | null> {
		const existingUser = await this.userRepository.findOne(updateUserDto.id);

		if (!existingUser) {
			throw new NotFoundException(`User with ID ${updateUserDto.id} not found`);
		}

		const updatedArgs = this.getUpdatedArgs(updateUserDto);

		const mergedUser: Partial<UserEntity> = {
			...existingUser,
			...updatedArgs,
		};

		const updatedUser = await this.userRepository.update(mergedUser as UserEntity);

		if (!updatedUser) {
			return null;
		}

		return this.mapToUserDTO(updatedUser);
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

	private mapToUserDTO(user: UserEntity): IUser {
		return {
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			role: user.role,
			status: user.status,
		};
	}
}