import { Body, Controller, HttpCode, HttpStatus, Post, Get, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

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

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req: any) { // any type for now, will change in the future
        try {
            return req.user;
        } catch(err) {
            return {
                status: HttpStatus.BAD_REQUEST,
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
