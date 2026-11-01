import { Prisma, PrismaClient } from "@prisma/client";
import { interests } from "src/constants/interests";

export const InterestSeeder = async (prisma: PrismaClient) => {
    for (const i of interests) {
        const interest: Prisma.InterestCreateInput = {
            name: i,
        };
        
        await prisma.interest.upsert({
            where: { name: i },
            update: {},
            create: interest,
        })
    }
};