import { IsOptional, IsBoolean, IsNumber, Min, Max } from 'class-validator';

export class UpdateCardDto {
  @IsOptional()
  @IsBoolean()
  readonly isActive?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(500)
  @Max(6000)
  readonly withdrawalLimit?: number;
}
