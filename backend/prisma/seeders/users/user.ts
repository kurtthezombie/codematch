import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { Prisma, ExperienceLevel, CoderStatus } from "generated/prisma";
import { faker } from "@faker-js/faker";
import bycrypt from "bcrypt";
import { randomizeFetchEnumValue } from "src/helpers/db-function";

export const UserSeeder = async (prisma: PrismaClient) => {
  const person = faker.person;
  const internet = faker.internet;
  const location = faker.location;

  const hashedPassword = await bycrypt.hash("Password2026!", 10);

  for(let x = 0; x < 10; x++) {
    const email = internet.email();

    const user: Prisma.UserCreateInput = {
      username: internet.username(),
      email: email,
      passwordHash: hashedPassword,
      bio: person.bio(),
      location: location.streetAddress(),
      skills: ["Skill 1", "Skill 2"],
      experienceLevel: randomizeFetchEnumValue(ExperienceLevel), // enum
      coderStatus: randomizeFetchEnumValue(CoderStatus), // enum
      projectInterests: ["Interest 1", "Interest 2"],
      avatarUrl: internet.url(),
    };

    await prisma.user.upsert({
      where: { email: email },
      update: {},
      create: user,
    });
  };
};