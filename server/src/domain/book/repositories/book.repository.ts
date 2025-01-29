import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from '../entities/book.entity';
import { Brackets, Repository } from 'typeorm';
import { BookUserEntity } from '../entities/bookUser.entity';
import { IGetAllBooks } from '../types/interfaces';
import Constants from '../../../types/constants';

@Injectable()
export default class BookRepository {
	constructor(
		@InjectRepository(BookEntity) private bookEntityRepository: Repository<BookEntity>,
		@InjectRepository(BookUserEntity) private bookUserEntityRepository: Repository<BookUserEntity>,
	) {}

	async getAllBooks({ userId, search, page, limit }: IGetAllBooks): Promise<{
		data: BookEntity[];
		total: number;
		page: number;
		limit: number;
	}> {
		const offset = (page - 1) * limit;

		const queryBuilder = this.bookEntityRepository.createQueryBuilder('book');

		if (userId) {
			queryBuilder
				.innerJoin('book_user', 'bookUser', 'book.id = bookUser.book_id')
				.andWhere('bookUser.user_id = :userId', { userId });
		}

		if (search && search.length > Constants.MIN_CHARACTERS_SEARCH - 1) {
			queryBuilder.andWhere(
				new Brackets((qb) => {
					qb.where('book.title ILIKE :search', { search: `%${search}%` })
					  .orWhere('book.author ILIKE :search', { search: `%${search}%` });
				})
			);
		}

		const [data, total] = await queryBuilder
			.skip(offset)
			.take(limit)
			.getManyAndCount();

		return {
			data,
			total,
			page,
			limit,
		};
	}

	async findOne(id: string): Promise<BookEntity> {
		return this.bookEntityRepository.findOne({ where: { id } });
	}

	async delete(id: string): Promise<{ id: string, status: boolean}> {
		const result = await this.bookEntityRepository.delete({ id });
		return { id, status: result.affected === 1 };
	}

	async findOneByTitleAndAuthor(title: string, author:string): Promise<BookEntity> {
		return this.bookEntityRepository.findOne({ where: { title, author } });
	}

	async create(entity: Omit<BookEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<BookEntity> {
		const now = new Date(Date.now()).toISOString();

		return this.bookEntityRepository.save({
			...entity,
			createdAt: now,
			updatedAt: now,
		});
	}

	async update(entity: Partial<BookEntity>): Promise<BookEntity> {
		const now = new Date(Date.now()).toISOString();

		return await this.bookEntityRepository.save({
			...entity,
			updatedAt: now,
		});
	}

	async getRatingCount(userId: string, bookId: string): Promise<number> {
		const result = await this.bookUserEntityRepository
			.createQueryBuilder('book_user')
			.select('book_user.user_rating', 'count')
			.where('book_user.user_id = :userId', { userId })
			.andWhere('book_user.book_id = :bookId', { bookId })
			.getRawOne();

		return result?.count ?? 0;
	}

	async getAverageRating(bookId: string): Promise<number | null> {
		const result = await this.bookUserEntityRepository
			.createQueryBuilder('book_user')
			.select('AVG(book_user.user_rating)', 'average_rating')
			.where('book_user.book_id = :bookId', { bookId })
			.andWhere('book_user.user_rating IS NOT NULL')
			.getRawOne();

		return result?.average_rating ? parseFloat(result.average_rating) : null;
	}

	async updateRating(id: number, rating: number): Promise<BookUserEntity> {
		const now = new Date(Date.now()).toISOString();

		return this.bookUserEntityRepository.save({
			id,
			user_rating: rating,
			updatedAt: now,
		});
	}
}