import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from '@prisma/client';
import { CreateCardDto } from './dto/add-card.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class CardService {
  constructor(private prisma: PrismaService) {}

  async findOne(cardId: number): Promise<Card> {
    return this.prisma.card.findUnique({
      where: { id: cardId },
    });
  }

  async create(createCardDto: CreateCardDto) {
    const { pin } = createCardDto;
    const saltOrRounds = 10;
    const pinHash = await bcrypt.hash(`${pin}`, saltOrRounds);

    const card = await this.prisma.card.create({
      data: {
        cardNumber: createCardDto.cardNumber,
        cardholderName: createCardDto.cardholderName,
        expirationDate: createCardDto.expirationDate,
        cvv: createCardDto.cvv,
        pinHash: pinHash,
        isActive: false,
        type: createCardDto.type,
        withdrawalLimit: createCardDto.withdrawalLimit,
        account: { connect: { id: 1 } },
      },
    });

    return card;
  }

  async updateCardById(
    cardId: number,
    updateCardDto: UpdateCardDto,
  ): Promise<Card> {
    return this.prisma.card.update({
      where: { id: cardId },
      data: updateCardDto,
    });
  }
}
