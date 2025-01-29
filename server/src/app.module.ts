import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './domain/user/users.module';
import { BooksModule } from './domain/book/books.module';
import { TypeOrmConfigService } from './shared/typeorm.service';
import configuration from '../config/configuration';
import { AuthModule } from './domain/auth/auth.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [ configuration ],
		}),
		TypeOrmModule.forRootAsync({
			useClass: TypeOrmConfigService,
		}),
		UsersModule,
		BooksModule,
		AuthModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
