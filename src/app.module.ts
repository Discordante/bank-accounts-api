import { Module } from '@nestjs/common';
import { CardModule } from './card/card.module';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
import { AccountModule } from './account/account.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [ConfigModule.forRoot(), CardModule, AccountModule, TransactionModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
