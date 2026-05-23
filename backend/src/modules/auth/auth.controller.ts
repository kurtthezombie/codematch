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
        try {
            return this.authService.signup(dto);
        } catch(err) {
            return {
                status: HttpStatus.BAD_REQUEST,
                message: err.message
            }
        }
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() dto: LoginDto) {
        try {
            return this.authService.login(dto);
        } catch(err) {
            return {
                status: HttpStatus.UNAUTHORIZED,
                message: err.message
            }
        }
    }

    @Get('profile')
    getProfile(@Request() req: AuthenticatedRequest) {
        try {
            return this.authService.getProfile(req.user.sub);
        } catch(err) {
            return {
                status: HttpStatus.NOT_FOUND,
                message: err.message
            }
        }
    }

    @Post('logout')
    async logout() {
        try {
            return this.authService.logout();
        } catch(err) {
            return {
                status: HttpStatus.BAD_REQUEST,
                message: err.message
            }
        }
    } 
}
