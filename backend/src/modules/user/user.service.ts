import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseService } from 'src/common/base.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService extends BaseService {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  async findOne(id: number) {
    const user = await this.user.findUnique({
      where: { id },
      include: {
        profile: true,
        skills: {
          include: {
            skill: true,
          },
        },
        interests: {
          include: {
            interest: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const { passwordHash, profile, skills, interests, ...safeUser } = user;

    return {
      message: 'User retrieved successfully',
      safeUser: {
        ...safeUser,
        bio: profile?.bio,
        location: profile?.location,
        avatarUrl: profile?.avatarUrl,
        experienceLevel: profile?.experienceLevel,
        coderStatus: profile?.availabilityStatus,
        skills: skills.map((userSkill) => userSkill.skill.name),
        projectInterests: interests.map((userInterest) => userInterest.interest.name),
      },
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const {
        bio,
        location,
        avatarUrl,
        experienceLevel,
        coderStatus,
        skills,
        projectInterests,
      } = updateUserDto;

      const profileData = {
        ...(bio !== undefined && { bio }),
        ...(location !== undefined && { location }),
        ...(avatarUrl !== undefined && { avatarUrl }),
        ...(experienceLevel !== undefined && { experienceLevel }),
        ...(coderStatus !== undefined && { availabilityStatus: coderStatus }),
      };

      const updatedUser = await this.user.update({
        where: { id },
        data: {
          ...(Object.keys(profileData).length > 0 && {
            profile: {
              upsert: {
                create: profileData,
                update: profileData,
              },
            },
          }),
          ...(skills !== undefined && {
            skills: {
              deleteMany: {},
              create: skills.map((name) => ({
                skill: {
                  connectOrCreate: {
                    where: { name },
                    create: { name },
                  },
                },
              })),
            },
          }),
          ...(projectInterests !== undefined && {
            interests: {
              deleteMany: {},
              create: projectInterests.map((name) => ({
                interest: {
                  connectOrCreate: {
                    where: { name },
                    create: { name },
                  },
                },
              })),
            },
          }),
        },
        include: {
          profile: true,
          skills: {
            include: {
              skill: true,
            },
          },
          interests: {
            include: {
              interest: true,
            },
          },
        },
      });

      const { passwordHash, profile, skills: userSkills, interests, ...data } = updatedUser;

      return {
        message: 'User updated successfully',
        data: {
          ...data,
          bio: profile?.bio,
          location: profile?.location,
          avatarUrl: profile?.avatarUrl,
          experienceLevel: profile?.experienceLevel,
          coderStatus: profile?.availabilityStatus,
          skills: userSkills.map((userSkill) => userSkill.skill.name),
          projectInterests: interests.map((userInterest) => userInterest.interest.name),
        },
      };
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }
}
