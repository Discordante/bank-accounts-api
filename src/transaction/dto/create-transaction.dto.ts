import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { TransactionType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({ example: TransactionType.DEPOSIT, enum: TransactionType })
  @IsEnum(TransactionType)
  @IsDefined()
  @IsNotEmpty()
  type: TransactionType;

  @ApiProperty({ example: 100 })
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ example: 'Initial deposit of money' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  cardId: number;
}
