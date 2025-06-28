import { IsNotEmpty, IsNumber, IsString, IsEnum, IsDateString } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsEnum(['credit', 'debit'])
  @IsNotEmpty()
  type: 'credit' | 'debit';

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  category: string;
}
