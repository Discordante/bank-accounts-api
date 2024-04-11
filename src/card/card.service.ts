import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from '@prisma/client';

@Injectable()
export class CardService {
  constructor(private prisma: PrismaService) {}

  async findOne(cardId: string): Promise<Card> {
    return this.prisma.card.findUnique({
      where: { id: cardId },
    });
  }

  async updateCardById(
    cardId: string,
    updateCardDto: UpdateCardDto,
  ): Promise<Card> {
    return this.prisma.card.update({
      where: { id: cardId },
      data: updateCardDto,
    });
  }
}
