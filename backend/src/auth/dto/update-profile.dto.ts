// src/auth/dto/update-profile.dto.ts

import { IsOptional, IsString, IsNotEmpty,Matches } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsString()
  @IsNotEmpty({ message: 'Phone number is required' })
  @Matches(/^\+?[0-9]{10,15}$/, { message: 'Invalid phone number' })
  phone: string;

  @IsOptional()
  @IsString()
  countryCode?: string;
}
