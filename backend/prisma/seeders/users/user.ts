import "dotenv/config";
import { Prisma, PrismaClient } from "generated/prisma";
import bycrypt from "bcrypt";

const experienceLevels = ["Beginner", "Intermediate", "Advanced", "Expert"];
const availabilityStatuses = ["Student", "Enthusiast", "Professional"];
const skillNames = ["JavaScript", "TypeScript", "Node.js", "React", "PostgreSQL"];
const interestNames = ["Web Apps", "Open Source", "SaaS", "Developer Tools"];

export const UserSeeder = async (prisma: PrismaClient) => {
  const hashedPassword = await bycrypt.hash("Password2026!", 10);

  for (let x = 0; x < 10; x++) {
    const email = `user${x + 1}@example.com`;
    const userSkills = [skillNames[x % skillNames.length], skillNames[(x + 1) % skillNames.length]];
    const userInterests = [interestNames[x % interestNames.length], interestNames[(x + 1) % interestNames.length]];

    const user: Prisma.UserCreateInput = {
      username: `user${x + 1}`,
      email,
      passwordHash: hashedPassword,
      profile: {
        create: {
          bio: `Seed profile for user ${x + 1}`,
          location: `Location ${x + 1}`,
          experienceLevel: experienceLevels[x % experienceLevels.length],
          availabilityStatus: availabilityStatuses[x % availabilityStatuses.length],
          avatarUrl: `https://example.com/avatar-${x + 1}.png`,
        },
      },
      skills: {
        create: userSkills.map((name) => ({
          skill: {
            connectOrCreate: {
              where: { name },
              create: { name },
            },
          },
        })),
      },
      interests: {
        create: userInterests.map((name) => ({
          interest: {
            connectOrCreate: {
              where: { name },
              create: { name },
            },
          },
        })),
      },
    };

    await prisma.user.upsert({
      where: { email: email },
      update: {},
      create: user,
    });
  }
};
