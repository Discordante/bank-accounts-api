import { Module } from '@nestjs/common';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CardController],
  providers: [CardService, PrismaService],
  exports: [CardService],
})
export class CardModule {}
