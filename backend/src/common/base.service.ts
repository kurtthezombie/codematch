import { PrismaService } from "src/prisma/prisma.service";

export class BaseService {
    constructor(protected readonly prisma: PrismaService) {}

    get user() {
        return this.prisma.user;
    }

    get skill() {
        return this.prisma.skill;
    }

    get userSkill() {
        return this.prisma.userSkill;
    }

    get interest() {
        return this.prisma.interest;
    }

    get userInterest() {
        return this.prisma.userInterest;
    }
}