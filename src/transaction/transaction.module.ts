import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';

import { PrismaService } from 'src/prisma.service';
import { TransactionService } from './transaction.service';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService, PrismaService],
})
export class TransactionModule {}
