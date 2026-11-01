import { Test, TestingModule } from '@nestjs/testing';
import { InterestService } from './interest.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('InterestService', () => {
  let service: InterestService;

  const mockPrismaService = {
    interest: {
      findMany: jest.fn(),
    },
    user: {
      findFirst: jest.fn(),
    },
    userInterest: {
      findMany: jest.fn(),
    }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InterestService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        }
      ],
    }).compile();

    service = module.get<InterestService>(InterestService);
  
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get all interests', async () => {
    mockPrismaService.interest.findMany.mockResolvedValue([
      { name: 'Web Development' },
      { name: 'Web Applications' },
    ]);

    const result = await service.getAllInterests();
  
    expect(result).toEqual([
      'Web Development',
      'Web Applications'
    ]);

    expect(mockPrismaService.interest.findMany).toHaveBeenCalled();
  });

  it('should return user interests', async () => {
    const mockUserId = 1;

    mockPrismaService.user.findFirst.mockResolvedValue({
      id: mockUserId,
    });

    mockPrismaService.userInterest.findMany.mockResolvedValue([
      { interestId: 1 },
      { interestId: 2 }
    ]);

    mockPrismaService.interest.findMany.mockResolvedValue([
      {
        name: 'Web Development',
      },
      {
        name: 'Web Applications',
      },
    ]); 
    
    const result = await service.getUserInterests(mockUserId);

    expect(result).toEqual([
      'Web Development',
      'Web Applications',
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

    await expect(service.getUserInterests(mockUserId)).rejects.toThrow('User with that ID does not exist.');
  });

  it('should accept an empty array if user has no skills', async () => {
    const mockerUserId = 1;

    mockPrismaService.user.findFirst.mockResolvedValue({
      id: mockerUserId
    });

    mockPrismaService.userInterest.findMany.mockResolvedValue([]);

    mockPrismaService.interest.findMany.mockResolvedValue([]);

    await expect(service.getUserInterests(mockerUserId)).resolves.toEqual([]);
  });
});
