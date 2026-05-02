import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SkillService extends BaseService {
    constructor(prisma: PrismaService) {
        super(prisma);
    }    

    async getAllSkills() {
        const skills = await this.skills.findMany();

        if (Object.keys(skills).length === 0) {
            return [];
        }

        const sanitized = skills.map(skill => skill.name); 
        return sanitized;
    }

    async getUserSkills(userId: number) {
        const userSkills = await this.userSkills.findMany({
            where: { userId: userId }
        });

        const skills = await this.skills.findMany({
            where: {
                id: {
                    in: userSkills.map(s => s.skillId), 
                }
            }
        });

        const sanitized = skills.map((skill) => {
            return {
                name: skill.name,
                category: skill.category ?? '',
            }
        });
        
        return sanitized;
    }
}
