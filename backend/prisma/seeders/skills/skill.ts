import { Prisma, PrismaClient } from "@prisma/client";
import { skills } from "src/constants/skills";

export const SkillSeeder = async (prisma: PrismaClient) => {
    for (const s of skills) {
        const skill: Prisma.SkillCreateInput = {
            name: s,
        };
        
        await prisma.skill.upsert({ 
            where: { name: s },
            update: {},
            create: skill 
        });
    }
};