import { BadRequestException, Controller, Get, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { InterestService } from './interest.service';
import { Public } from 'src/decorator/isPublic';

@Controller('interest')
export class InterestController {
    constructor(private readonly interestService: InterestService) {}

    @Public()
    @Get('all')
    async getAllInterests() {
        try {
            const allInterests = await this.interestService.getAllInterests(); 
            
            if (allInterests.length == 0) {
                throw new Error('Empty interests');
            }
            
            return {
                code: 200,
                message: 'Successfully fetched all interests',
                interests: allInterests,
            };
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }

    @Get('user/:id')
    async getUserInterests(@Param('id', ParseIntPipe) userId: number) {
        try {
            const userInterests = await this.interestService.getUserInterests(userId);
        
            if (!userInterests) {
                throw new Error('Error fetching user\'s interests');
            }

            return {
                code: 200,
                message: 'Successfully fetched user\'s interests',
                userInterests: userInterests,
            }
        } catch(err) {
            throw new NotFoundException(err.message);
        }
    }
}
