import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class InterestService extends BaseService {
    constructor(prisma: PrismaService) {
        super(prisma);
    }

    async getAllInterests() {
        const interests = await this.interest.findMany();

        if (Object.keys(interests).length === 0) {
            return [];
        }

        const sanitized = interests.map(interest => interest.name); 
        return sanitized;
    }

    async getUserInterests(userId: number) {
        const userFound = await this.user.findFirst({
            where: { id: userId, isActive: true },
            select: { id: true },
        });

        if (!userFound) {
            throw new NotFoundException('User with that ID does not exist.');
        }

        const userInterests = await this.userInterest.findMany({
            where: { userId: userFound.id }
        });

        const interests = await this.interest.findMany({
            where: {
                id: {
                    in: userInterests.map(u => u.interestId), 
                }
            }
        });

        const sanitized = interests.map(interest => interest.name);
        
        return sanitized;
    }
}
