import { Module } from '@nestjs/common';
import { CardModule } from './card/card.module';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), CardModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
