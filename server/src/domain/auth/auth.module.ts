import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersModule } from '../user/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './services/jwtStrategy';

@Module({
	imports: [
		UsersModule,
		JwtModule,
		PassportModule.register({ defaultStrategy: 'jwt' }),
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		JwtService,
		JwtStrategy,
	],
	exports: [
		AuthService,
		JwtModule,
		PassportModule,
	],
})
export class AuthModule {}
