import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const { type, amount, description, accountId } = createTransactionDto;

    return this.prisma.transaction.create({
      data: {
        type,
        amount,
        description,
        Account: { connect: { id: accountId } },
      },
    });
  }

  async findByAccount(accountId: number) {
    return this.prisma.transaction.findMany({
      where: { accountId: accountId },
    });
  }
}
