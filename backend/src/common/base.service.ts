import { PrismaService } from "src/prisma/prisma.service";

export class BaseService {
    constructor(protected readonly prisma: PrismaService) {}

    get user() {
        return this.prisma.user;
    }

    get skills() {
        return this.prisma.skill;
    }

    get userSkills() {
        return this.prisma.userSkill;
    }

    get interests() {
        return this.prisma.interest;
    }

    get userInterests() {
        return this.prisma.userInterest;
    }
}