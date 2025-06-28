import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Matches,
  MaxLength,
  Length,
  IsOptional,
  IsIn,
} from 'class-validator';

export class SignupDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @Matches(/^[a-zA-Z\s]+$/, { message: 'Name can only contain letters and spaces' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Phone number is required' })
  @Matches(/^\+?[0-9]{10,15}$/, { message: 'Invalid phone number' })
  phone: string;

  @IsEmail({}, { message: 'Invalid email address' })
  @MaxLength(100, { message: 'Email must be less than 100 characters' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @MaxLength(32, { message: 'Password must be less than 32 characters' })
  @Matches(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
  @Matches(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
  @Matches(/[0-9]/, { message: 'Password must contain at least one number' })
  @Matches(/[^a-zA-Z0-9]/, { message: 'Password must contain at least one special character' })
  password: string;

  @IsOptional()
  @IsString()
  @Length(2, 2, { message: 'Country code must be exactly 2 letters (ISO 3166-1 alpha-2)' })
  countryCode?: string;
}
