import { Body, Controller, Get, Param, Patch, Post, Delete, Query } from '@nestjs/common';
import { BooksService } from '../services/books.service';
import Constants from '../../../types/constants';
import { AddBookToUserDto, CreateBookDto, GetBooksQueryDto, UpdateBookDto, UpdateRatingDto } from '../dto/book.dto';

@Controller('books')
export class BooksController {
	constructor(
		private readonly bookService: BooksService
	) {}

    @Get()
    async getAllBooks(@Query() query: GetBooksQueryDto) {
        const { userId, search, page, limit } = query;

		const pageNumber = page || 1;
		const pageSize = limit || Constants.MAX_BOOKS_PER_PAGE;

		return await this.bookService.getAllBooks({ userId, search, page: pageNumber, limit: pageSize });
	}

	@Post()
	create(@Body() createBookDto: CreateBookDto) {
		return this.bookService.create(createBookDto);
	}

	@Post('user')
	addExistingBookToUserLibrary(@Body() addBookToUserDto: AddBookToUserDto) {
		return this.bookService.addExistingBookToUserLibrary(addBookToUserDto);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.bookService.findOne(id);
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateBookDto: UpdateBookDto
	) {
		return this.bookService.update(id, updateBookDto);
	}

	@Patch('ratings')
	updateRating(@Body() updateRatingDto: UpdateRatingDto) {
		return this.bookService.updateRating(updateRatingDto);
	}

	@Delete(':id')
	delete (@Param('id') id: string) {
		return this.bookService.delete(id);
	}
}
