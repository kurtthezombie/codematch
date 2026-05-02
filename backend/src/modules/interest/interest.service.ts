import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InterestService extends BaseService {
    constructor(prisma: PrismaService) {
        super(prisma);
    }

    async getAllInterests() {
        const interests = await this.interests.findMany();

        if (Object.keys(interests).length === 0) {
            return [];
        }

        const sanitized = interests.map(interest => interest.name); 
        return sanitized;
    }

    async getUserInterests(userId: number) {
        const userInterests = await this.userInterests.findMany({
            where: { userId: userId }
        });

        const interests = await this.interests.findMany({
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
