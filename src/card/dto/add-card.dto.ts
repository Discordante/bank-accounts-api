import {
  IsEnum,
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  Max,
  IsDate,
  MinDate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CardType } from '@prisma/client';

export class CreateCardDto {
  @IsNotEmpty()
  @IsString()
  readonly cardNumber: string;

  @IsNotEmpty()
  @IsString()
  readonly cardholderName: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @MinDate(new Date())
  readonly expirationDate: Date;

  @IsNotEmpty()
  @IsString()
  readonly cvv: string;

  @IsEnum(CardType)
  readonly type: CardType;

  @IsNotEmpty()
  @IsNumber()
  @Min(500)
  @Max(6000)
  readonly withdrawalLimit: number;

  @IsNotEmpty()
  @IsString()
  readonly accountId: string;
}
