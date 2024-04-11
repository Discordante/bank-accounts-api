import {
  IsDefined,
  IsEnum,
  IsIBAN,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
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
  @ValidateIf((o) => o.type === TransactionType.DEPOSIT ||  o.type === TransactionType.WITHDRAWAL)
  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  cardId: number;

  @ApiProperty({ example: 123 })
  @ValidateIf((o) => o.type === TransactionType.DEPOSIT ||  o.type === TransactionType.WITHDRAWAL)
  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  pin: number;

  @ApiProperty({ example: 'DE68500105178297336485' })
  @ValidateIf((o) => o.type === TransactionType.TRANSFER_SENT)
  //@IsIBAN()
  @IsOptional()
  @IsNotEmpty()
  externalAccountIBAN: string;
}
