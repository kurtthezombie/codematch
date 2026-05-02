import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/decorator/isPublic';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  findOne(@Param('id') id: number) {
    try {
      const user = this.userService.findOne(+id);

      if (!user) {
        throw new UnauthorizedException();
      }

      return user;
    } catch(err) {
      return {
        status: HttpStatus.NOT_FOUND, 
        message: err.message
      }
    }
  }

  @Public()
  @Get()
  findAll() {
    try {
      const users = [];

      if (users.length == 0) {
        throw new BadRequestException();
      }

      return [];
      // return users;
    } catch(err) {
      return {
        status: HttpStatus.NO_CONTENT,
        message: err.message
      }
    }
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = this.userService.update(+id, updateUserDto); 
    
      if (!updatedUser) {
        throw new BadRequestException();
      }

      return updatedUser;
    } catch(err) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: err.message
      }
    }
  }
}
