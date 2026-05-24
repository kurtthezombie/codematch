import { Body, Controller, HttpCode, HttpStatus, Post, Get, Request, BadRequestException, UnauthorizedException, NotFoundException } from '@nestjs/common';
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
        try {
            return await this.authService.signup(dto);
        } catch(err) {
            throw new BadRequestException(err.message);
        }
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() dto: LoginDto) {
        try {
            return await this.authService.login(dto);
        } catch(err) {
            throw new UnauthorizedException(err.message);
        }
    }

    @Get('profile')
    async getProfile(@Request() req: AuthenticatedRequest) {
        try {
            return await this.authService.getProfile(req.user.sub);
        } catch(err) {
            throw new NotFoundException(err.message);
        }
    }

    @Post('logout')
    async logout() {
        try {
            return await this.authService.logout();
        } catch(err) {
            throw new BadRequestException(err.message);
        }
    } 
}
