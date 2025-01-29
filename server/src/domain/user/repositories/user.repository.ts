import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export default class UserRepository {

	constructor(
		@InjectRepository(UserEntity) private userEntityRepository: Repository<UserEntity>,
	) {}

	async findAndCount(page: number, limit: number): Promise<{
		data: UserEntity[];
		total: number;
		page: number;
		limit: number;
	}> {
		const [data, total] = await this.userEntityRepository.findAndCount({
			skip: (page - 1) * limit,
			take: limit,
		});

		return {
			data,
			total,
			page,
			limit,
		};
	}

	async findOne(id: string): Promise<UserEntity> {
		return this.userEntityRepository.findOne({ where: { id } });
	}

	async findByEmail(email: string): Promise<UserEntity> {
		return this.userEntityRepository.findOne({ where: { email }	});
	}

	async create(entity: Partial<UserEntity>): Promise<UserEntity> {
		const now = new Date(Date.now()).toISOString();

		return this.userEntityRepository.save({
			...entity,
			createdAt: now,
			updatedAt: now,
		});
	}

	async update(entity: Partial<UserEntity>): Promise<UserEntity> {
		const now = new Date(Date.now()).toISOString();

		return await this.userEntityRepository.save({
			...entity,
			updatedAt: now,
		});
	}
}