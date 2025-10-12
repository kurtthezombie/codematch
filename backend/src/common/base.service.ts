import { PrismaService } from "src/prisma/prisma.service";

export class BaseService {
    constructor(protected readonly prisma: PrismaService) {}

    get user() {
        return this.prisma.user;
    }
}