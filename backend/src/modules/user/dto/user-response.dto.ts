// src/modules/user/dto/user-response.dto.ts
import { CoderStatus, ExperienceLevel } from 'generated/prisma';
import { IsArray, IsEnum, IsOptional, IsString, IsDate, IsInt } from 'class-validator';

export class UserResponseDto {
  @IsInt()
  id: number;

  @IsString()
  username: string;

  @IsString()
  email: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  skills?: string[];

  @IsEnum(ExperienceLevel)
  @IsOptional()
  experienceLevel?: ExperienceLevel;

  @IsEnum(CoderStatus)
  @IsOptional()
  coderStatus?: CoderStatus;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  projectInterests?: string[];

  @IsString()
  @IsOptional()
  avatarUrl?: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
