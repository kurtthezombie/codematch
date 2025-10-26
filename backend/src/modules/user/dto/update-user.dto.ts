import { PartialType } from '@nestjs/mapped-types';
import { IsAlphanumeric, IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { CoderStatus, ExperienceLevel } from 'generated/prisma';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  location?: string;
  
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills?: string[];

  @IsOptional()
  @IsEnum(ExperienceLevel)
  experienceLevel?: ExperienceLevel;

  @IsOptional()
  @IsEnum(CoderStatus)
  coderStatus?: CoderStatus;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  projectInterests?: string[];

  @IsOptional()
  @IsString()
  avatarUrl?: string;
}
