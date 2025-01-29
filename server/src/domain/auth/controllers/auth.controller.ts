import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from '../../user/dto/user.dto';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
	) {}

    @Post('register')
    async register(@Body() body: UserDto) {
        return this.authService.register(body);
    }

    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
        return this.authService.login(body.email, body.password);
    }

    @Get('profile')
    @UseGuards(AuthGuard('jwt'))
    async getProfile(@Req() req) {
        return req.user; // JWT payload
    }
}
