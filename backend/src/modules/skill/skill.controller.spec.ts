import { Test, TestingModule } from '@nestjs/testing';
import { SkillController } from './skill.controller';
import { SkillService } from './skill.service';
import { skills } from '../../constants/skills';
import { NotFoundException } from '@nestjs/common';

describe('SkillController', () => {
  let controller: SkillController;
  let service: SkillService;

  const mockSkillService = {
    getAllSkills: jest.fn(),
    getUserSkills: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SkillController],
      providers: [{
        provide: SkillService,
        useValue: mockSkillService,
      }]
    }).compile();

    controller = module.get<SkillController>(SkillController);
    service = module.get<SkillService>(SkillService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should get all skills', async () => {
    const mockResult = {
      code: 200,
      message: 'Successfully fetched all skills',
      skills      
    }

    mockSkillService.getAllSkills.mockResolvedValue(skills);

    expect(await controller.getAllSkills()).toEqual(mockResult);
    expect(mockSkillService.getAllSkills).toHaveBeenCalled();
  });

  it('should get a user\'s skill', async () => {
    const selectedUserSkill = [
      {
        name: 'JavaScript',
        category: '',
      },
      {
        name: 'TypeScript',
        category: '',
      }
    ];

    const mockResult = {
      code: 200,
      message: 'Successfully fetched user\'s skills',
      userSkills: selectedUserSkill      
    }

    mockSkillService.getUserSkills.mockResolvedValue(selectedUserSkill);
    expect(await controller.getUserSkills(1)).toEqual(mockResult);
    expect(mockSkillService.getUserSkills).toHaveBeenCalled();
  });

  it('should return an error if userId does not exist', async () => {
    const mockUserId = 999999;

    mockSkillService.getUserSkills.mockRejectedValue(
    new NotFoundException(
        'User with that ID does not exist.',
      ),
    );

    await expect(controller.getUserSkills(mockUserId)).rejects.toThrow('User with that ID does not exist.');

    expect(mockSkillService.getUserSkills).toHaveBeenCalledWith(mockUserId);
  });
});
