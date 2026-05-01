import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { UserSeeder } from './seeders/users/user';

const prisma = new PrismaClient();

/**
 * 
 * to execute seeder just do the command in the terminal:
 * 
 * npm run db:seed
 * 
 */

async function main() {
    // call seeders here
    await UserSeeder(prisma);
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
