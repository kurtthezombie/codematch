import { BadRequestException, Controller, Get, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { SkillService } from './skill.service';
import { Public } from 'src/decorator/isPublic';

@Controller('skill')
export class SkillController {
    constructor(private readonly skillService: SkillService) {}

    @Public()
    @Get('all')
    async getAllSkills() {
        try {
            const allSkills = await this.skillService.getAllSkills(); 
            
            if (allSkills.length == 0) {
                throw new Error('Empty skills');
            }
            
            return {
                code: 200,
                message: 'Successfully fetched all skills',
                skills: allSkills,
            };
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }

    @Get('user/:id')
    async getUserSkills(@Param('id', ParseIntPipe) userId: number) {
        try {
            const userSkills = await this.skillService.getUserSkills(userId);
        
            if (!userSkills) {
                throw new Error('Error fetching user\'s skills');
            }

            return {
                code: 200,
                message: 'Successfully fetched user\'s skills',
                userSkills: userSkills,
            }
        } catch(err) {
            throw new NotFoundException(err.message);
        }
    }
}
