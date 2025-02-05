import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../../user/entities/user.entity';
import { UserDto } from '../../user/dto/user.dto';
import { UserService } from '../../user/services/user.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { IUser } from '../../user/types/interfaces';

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private config: ConfigService,
		private jwtService: JwtService,
	) {}

	async register(user: UserDto): Promise<IUser> {
        const existingUser = await this.userService.findByEmail(user.email);
        if (existingUser) throw new BadRequestException(`This email ${user.email} already exists`);

		return await this.userService.create(user);
    }

    async login(email: string, password: string): Promise<{ accessToken: string }> {
        const user = await this.userService.getUserWithHashPasswordByEmail(email);

        if (!user || !(await this.validatePassword(password, user.password))) {
            throw new UnauthorizedException('Invalid email or password');
        }

        return this.generateToken(user);
    }

	private generateToken(user: UserEntity) {
		const payload = { id: user.id, email: user.email, role: user.role };
		const secret = this.config.getOrThrow<string>('JWT_SECRET');

		return {
			accessToken: this.jwtService.sign(payload, { secret }),
		};
	}

	private async validatePassword(password: string, userPassword: string): Promise<boolean> {
        return bcrypt.compare(password, userPassword);
    }
}
