import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import UserRepository from './repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

@Module({
	imports: [
	  TypeOrmModule.forFeature([UserEntity]),
	],
	controllers: [UserController],
	providers: [
		UserService,
		UserRepository,
	],
	exports: [UserService],
})

export class UsersModule {}
