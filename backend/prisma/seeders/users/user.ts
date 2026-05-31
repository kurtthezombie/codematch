import 'dotenv/config';
import { Prisma, PrismaClient } from '@prisma/client';
import bycrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

const experienceLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
const availabilityStatuses = ['Student', 'Enthusiast', 'Professional'];
const skillNames = [
  'JavaScript',
  'TypeScript',
  'Node.js',
  'React',
  'PostgreSQL',
];
const interestNames = ['Web Apps', 'Open Source', 'SaaS', 'Developer Tools'];

export const UserSeeder = async (prisma: PrismaClient) => {
  const hashedPassword = await bycrypt.hash('Password2026!', 10);

  // admin seeder
  await CreateAdminSeeder(prisma, hashedPassword);

  // seed 10 users
  for (let x = 0; x < 10; x++) {
    const email = `user${x + 1}@example.com`;
    const userSkills = [
      skillNames[x % skillNames.length],
      skillNames[(x + 1) % skillNames.length],
    ];
    const userInterests = [
      interestNames[x % interestNames.length],
      interestNames[(x + 1) % interestNames.length],
    ];

    const user: Prisma.UserCreateInput = {
      username: `user${x + 1}`,
      email,
      passwordHash: hashedPassword,
      role: 'user',
      profile: {
        create: {
          fullName: faker.person.fullName(),
          bio: `Seed profile for user ${x + 1}`,
          location: `Location ${x + 1}`,
          experienceLevel: experienceLevels[x % experienceLevels.length],
          availabilityStatus:
            availabilityStatuses[x % availabilityStatuses.length],
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

const CreateAdminSeeder = async (
  prisma: PrismaClient,
  hashedPassword: string,
) => {
  // insert 1 admin as of now
  const admin: Prisma.UserCreateInput = {
    username: 'admin',
    email: 'admin@example.com',
    passwordHash: hashedPassword,
    role: 'admin',
    profile: {
      create: {
        bio: 'Admin profile',
        location: 'Admin location',
        experienceLevel: 'Expert',
        availabilityStatus: 'Professional',
        avatarUrl: 'https://example.com/admin-avatar.png',
      },
    },
  };

  await prisma.user.upsert({
    where: { email: admin.email },
    update: {},
    create: admin,
  });
};
