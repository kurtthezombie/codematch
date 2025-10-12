import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { BaseService } from 'src/common/base.service';

@Injectable()
export class AuthService extends BaseService {
    constructor(prisma: PrismaService) {
        super(prisma);
    }

    async signup(email: string, username: string, password: string) {
        const existingUser = await this.user.findFirst({
            where: { OR: [{ email }, { username }] },
        });

        if (existingUser) {
            throw new ConflictException('Email or username already exists');
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await this.prisma.user.create({
            data: {
                email,
                username,
                passwordHash,
            },
            select: {
                id: true,
                email: true,
                username: true,
                createdAt: true
            }
        });

        return {
            message: 'User created successfully',
            user,
        };
    }
}