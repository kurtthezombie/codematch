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
    })

    if (!user) {
      throw new Error('User not found');
    }

    const { passwordHash, ...safeUser } = user;

    return {
      message: 'User retrieved successfully',
      safeUser,
    };
  }   

  async update(id: number, updateUserDto: UpdateUserDto) {
    let safeUser;
    try {
      const updatedUser = await this.user.update({
        where: { id },
        data: updateUserDto,
      });

      const { passwordHash, ...rest } = updatedUser;
      safeUser = rest;
    } catch (error) {  
      throw new NotFoundException('User not found');
    }

    return {
      message: 'User updated successfully',
      safeUser,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
