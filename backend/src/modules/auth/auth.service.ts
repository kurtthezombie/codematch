import {
  ConflictException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { BaseService } from 'src/common/base.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService extends BaseService {
  constructor(
    prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {
    super(prisma);
  }

  async getProfile(userId: number) {
    const user = await this.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      status: HttpStatus.OK,
      data: user,
    };
  }

  async signup(dto: CreateUserDto) {
    const { email, username, role = 'user', password } = dto;

    const existingUser = await this.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });

    if (existingUser) {
      throw new ConflictException('Email or username already exists');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await this.user.create({
      data: { email, username, passwordHash, role },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        createdAt: true,
      },
    });

    return {
      status: HttpStatus.OK,
      message: 'User created successfully',
      user,
    };
  }

  async login(dto: LoginDto) {
    const { identifier, password } = dto;

    const user = await this.user.findFirst({
      where: {
        OR: [{ email: identifier }, { username: identifier }],
      },
    });

    if (!user) throw new UnauthorizedException('Account not found');

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) throw new UnauthorizedException('Invalid password');

    const payload = { sub: user.id, username: user.username, role: user.role };
    const access_token = await this.jwtService.signAsync(payload);

    return {
      status: HttpStatus.OK,
      message: 'Login successful',
      access_token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    };
  }

  async logout() {
    return {
      status: HttpStatus.OK,
      message: 'Logout successful',
    };
  }
}
