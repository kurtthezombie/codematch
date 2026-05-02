import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { UserSeeder } from './seeders/users/user';
import { SkillSeeder } from "./seeders/skills/skill";
import { InterestSeeder } from "./seeders/interests/interest";

const prisma = new PrismaClient();

/**
 * 
 * to execute seeder just do the command in the terminal:
 * 
 * npm run db:seed
 * 
 * 
 * to reset database do command:
 * 
 * npm run migrate:reset
 * 
 */

async function main() {
    // call seeders here
    await UserSeeder(prisma);
    await SkillSeeder(prisma);
    await InterestSeeder(prisma);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
