import { Controller, Patch, Body, Param, Get, Post } from '@nestjs/common';
import { CardService } from './card.service';
import { UpdateCardDto } from './dto/update-card.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateCardDto } from './dto/add-card.dto';

@ApiTags('Cards')
@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get('/:cardId')
  getCardById(@Param('cardId') cardId: number) {
    return this.cardService.findOne(cardId);
  }

  @Post()
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardService.create(createCardDto);
  }

  @Patch('/:cardId')
  updateCardSettings(
    @Param('cardId') cardId: number,
    @Body() updateCardDto: UpdateCardDto,
  ) {
    return this.cardService.updateCardById(cardId, updateCardDto);
  }
}
