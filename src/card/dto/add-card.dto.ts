import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  Max,
  IsEnum,
  IsDate,
  IsDefined,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CardType } from '@prisma/client';

export class CreateCardDto {
  @ApiProperty({ example: '1234567890123456' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly cardNumber: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly cardholderName: string;

  @ApiProperty({ example: '2024-12-31' })
  @IsDate()
  @IsDefined()
  @Type(() => Date)
  readonly expirationDate: Date;

  @ApiProperty({ example: 123 })
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  @Min(0)
  @Max(999)
  readonly cvv: number;

  @ApiProperty({ example: 1234 })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(9999)
  readonly pin: number;

  @ApiProperty({ example: CardType.CREDIT })
  @IsEnum(CardType)
  readonly type: CardType;

  @ApiProperty({ example: 1000 })
  @IsNumber()
  @Min(500)
  @Max(6000)
  readonly withdrawalLimit: number;
}
