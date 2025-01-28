import pg, { types } from 'pg';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { join, normalize } from 'path';
import { IConfigDb } from '../types/interfaces';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {

	constructor(private config: ConfigService) {}

	createTypeOrmOptions(): TypeOrmModuleOptions {
		const dbConfig = this.config.getOrThrow<IConfigDb>('db');

		return {
			type: 'postgres',
			host: dbConfig.host,
			port: dbConfig.port,
			database: dbConfig.database,
			username: dbConfig.username,
			password: dbConfig.password,
			synchronize: dbConfig.synchronize,
			logging: dbConfig.logging,
			autoLoadEntities: true,
			migrations: [ normalize(join(__dirname, '../migrations/*.js')) ],
			migrationsRun: !!dbConfig.runMigrations,
			retryAttempts: 5,
			retryDelay: 5000,
		};
	}
}
