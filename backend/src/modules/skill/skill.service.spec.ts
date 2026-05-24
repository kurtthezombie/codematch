import { Test, TestingModule } from '@nestjs/testing';
import { SkillService } from './skill.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('SkillService', () => {
  let service: SkillService;

  const mockPrismaService = {
    user: {
      findFirst: jest.fn(),
    },
    skill: {
      findMany: jest.fn(),
    },
    userSkill: {
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SkillService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        }
      ],
    }).compile();

    service = module.get<SkillService>(SkillService);
  
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return user skills', async () => {
    const mockUserId = 1;

    mockPrismaService.user.findFirst.mockResolvedValue({
      id: mockUserId,
    });

    mockPrismaService.userSkill.findMany.mockResolvedValue([
      { skillId: 1 },
      { skillId: 2 }
    ]);

    mockPrismaService.skill.findMany.mockResolvedValue([
      {
        name: 'ReactJS',
        category: 'Frontend',
      },
      {
        name: 'NestJS',
        category: 'Backend',
      },
    ]); 
    
    const result = await service.getUserSkills(mockUserId);

    expect(result).toEqual([
      {
        name: 'ReactJS',
        category: 'Frontend',
      },
      {
        name: 'NestJS',
        category: 'Backend',
      },
    ]);

    expect(mockPrismaService.user.findFirst).toHaveBeenLastCalledWith({
      where: {
        id: mockUserId,
        isActive: true,
      },
      select: { id: true }
    });
  });

  it('should throw if user does not exist', async () => {
    const mockUserId = 99999;

    mockPrismaService.user.findFirst.mockResolvedValue(null);

    await expect(service.getUserSkills(mockUserId)).rejects.toThrow('User with that ID does not exist.');
  });

  it('should accept an empty array if user has no skills', async () => {
    const mockerUserId = 1;

    mockPrismaService.user.findFirst.mockResolvedValue({
      id: mockerUserId
    });

    mockPrismaService.userSkill.findMany.mockResolvedValue([]);

    mockPrismaService.skill.findMany.mockResolvedValue([]);

    await expect(service.getUserSkills(mockerUserId)).resolves.toEqual([]);
  });
});
