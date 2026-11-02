import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  UnauthorizedException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/decorator/isPublic';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/constants/role.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const user = await this.userService.findOne(+id);

      if (!user) {
        throw new UnauthorizedException();
      }

      return user;
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  @Public()
  @Get()
  findAll() {
    try {
      const users = [];

      if (users.length == 0) {
        throw new BadRequestException('No users found.');
      }

      return [];
      // return users;
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  @Get('admins')
  @Roles(Role.Admin)
  async findAllAdmins() {
    try {
      const admins = await this.userService.findAllAdmins();

      if (admins.length == 0) {
        throw new NotFoundException('No admins found.');
      }

      return admins;
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.userService.update(+id, updateUserDto);

      if (!updatedUser) {
        throw new BadRequestException();
      }

      return updatedUser;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
