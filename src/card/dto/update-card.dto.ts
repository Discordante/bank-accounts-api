import { IsOptional, IsBoolean, IsNumber, Min, Max } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCardDto {
  @ApiPropertyOptional({
    description: 'Indicates whether the card is active or not.',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  readonly isActive?: boolean;

  @ApiPropertyOptional({
    description:
      'Withdrawal limit for the card, with a value between 500 and 6000 euros',
    example: 1500,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  @Min(500)
  @Max(6000)
  readonly withdrawalLimit?: number;
}
