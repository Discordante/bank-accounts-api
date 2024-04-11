import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';

import { PrismaService } from 'src/prisma.service';
import { TransactionService } from './transaction.service';
import { CardService } from 'src/card/card.service';
import { CardModule } from 'src/card/card.module';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService, PrismaService],
  imports:[CardModule]
})
export class TransactionModule {}
