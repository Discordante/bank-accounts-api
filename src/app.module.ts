import { Module } from '@nestjs/common';
import { CardModule } from './card/card.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [CardModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
