import { Body, Controller, HttpCode, HttpStatus, Post, Get, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';
import { Public } from 'src/decorator/isPublic';

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

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req: any) { // any type for now, will change in the future
        return req.user;
    }

    @Post('logout')
    async logout() {
        return this.authService.logout();
    } 
}
