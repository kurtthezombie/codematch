import { Test, TestingModule } from '@nestjs/testing';
import { InterestController } from './interest.controller';
import { InterestService } from './interest.service';
import { interests } from 'src/constants/interests';
import { NotFoundException } from '@nestjs/common';

describe('InterestController', () => {
  let controller: InterestController;
  let service: InterestService;

  const mockInterestService = {
    getAllInterests: jest.fn(),
    getUserInterests: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InterestController],
      providers: [
        {
          provide: InterestService,
          useValue: mockInterestService,
        }
      ]
    }).compile();

    controller = module.get<InterestController>(InterestController);
    service = module.get<InterestService>(InterestService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should get all interests', async () => {
    const mockResult = {
      code: 200,
      message: 'Successfully fetched all interests',
      interests      
    }

    mockInterestService.getAllInterests.mockResolvedValue(interests);

    expect(await controller.getAllInterests()).toEqual(mockResult);
    expect(mockInterestService.getAllInterests).toHaveBeenCalled();
  });

  it('should get the user\'s interests', async () => {
    const userInterests = ['Open Source', 'Web Apps'];

    const mockResult = {
      code: 200,
      message: 'Successfully fetched user\'s interests',
      userInterests: userInterests
    }

    mockInterestService.getUserInterests.mockResolvedValue(userInterests);
    expect(await controller.getUserInterests(1)).toEqual(mockResult);
    expect(mockInterestService.getUserInterests).toHaveBeenCalled();
  });

  it('should return an error when userId does not exist', async () => {
    const mockUserId = 999999;
    
        mockInterestService.getUserInterests.mockRejectedValue(
        new NotFoundException(
            'User with that ID does not exist.',
          ),
        );
    
        await expect(controller.getUserInterests(mockUserId)).rejects.toThrow('User with that ID does not exist.');
    
        expect(mockInterestService.getUserInterests).toHaveBeenCalledWith(mockUserId);
  });
});
