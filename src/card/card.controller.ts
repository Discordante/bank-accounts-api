import { Controller, Patch, Body, Param, Get } from '@nestjs/common';
import { CardService } from './card.service';
import { UpdateCardDto } from './dto/update-card.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cards')
@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get('/:cardId')
  getCardById(@Param('cardId') cardId: string) {
    return this.cardService.findOne(cardId);
  }

  @Patch('/:cardId')
  updateCardSettings(
    @Param('cardId') cardId: string,
    @Body() updateCardDto: UpdateCardDto,
  ) {
    return this.cardService.updateCardById(cardId, updateCardDto);
  }
}
