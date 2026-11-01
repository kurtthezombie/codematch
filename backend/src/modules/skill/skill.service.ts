import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from 'src/common/base.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SkillService extends BaseService {
    constructor(prisma: PrismaService) {
        super(prisma);
    }    

    async getAllSkills() {
        const skills = await this.skill.findMany();

        if (Object.keys(skills).length === 0) {
            return [];
        }

        const sanitized = skills.map(skill => skill.name); 
        return sanitized;
    }

    async getUserSkills(userId: number) {
        // check if userId has existing user
        const userFound = await this.user.findFirst({
            where: { id: userId, isActive: true },
            select: { id: true },
        });

        if (!userFound) {
            throw new NotFoundException('User with that ID does not exist.');
        }
        
        const userSkills = await this.userSkill.findMany({
            where: { userId: userFound.id }
        });

        const skills = await this.skill.findMany({
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
