import { Body, Controller, HttpCode, HttpStatus, Post, Get, Request } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/decorator/isPublic';

type AuthenticatedRequest = ExpressRequest & {
  user: {
    sub: number;
    username: string;
    iat?: number;
    exp?: number;
  };
};

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('signup')
    async signup(@Body() dto: CreateUserDto) {
        return this.authService.signup(dto);
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    @Get('profile')
    getProfile(@Request() req: AuthenticatedRequest) { // any type for now, will change in the future
        return this.authService.getProfile(req.user.sub);
    }

    @Post('logout')
    async logout() {
        return this.authService.logout();
    } 
}
