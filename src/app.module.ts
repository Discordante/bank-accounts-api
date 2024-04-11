import { Module } from '@nestjs/common';
import { CardModule } from './card/card.module';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
import { AccountModule } from './account/account.module';

@Module({
  imports: [ConfigModule.forRoot(), CardModule, AccountModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
