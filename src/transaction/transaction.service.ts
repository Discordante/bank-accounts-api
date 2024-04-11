import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionType } from '@prisma/client';
import { CardService } from 'src/card/card.service';

@Injectable()
export class TransactionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cardService: CardService,
  ) {}

  async findByAccount(accountId: number) {
    return this.prisma.transaction.findMany({
      where: { accountId: accountId },
    });
  }

  async createTransaction(createTransactionDto: CreateTransactionDto) {
    const relatedAccount = await this.cardService.findOne(
      createTransactionDto.cardId,
    );

    if (!relatedAccount) {
      throw new NotFoundException(
        'There are no accounts associated with the card',
      );
    }

    switch (createTransactionDto.type) {
      case TransactionType.DEPOSIT:
        return this.handleDeposit(
          createTransactionDto,
          relatedAccount.accountId,
        );

      case TransactionType.WITHDRAWAL:
        return this.handleWithdrawal(createTransactionDto);

      case TransactionType.TRANSFER_RECEIVED:
        return this.handleTransferReceived(createTransactionDto);

      case TransactionType.TRANSFER_SENT:
        return this.handleTransferSent(createTransactionDto);

      case TransactionType.FEE:
        return this.handleFee(createTransactionDto);

      default:
        throw new Error('Tipo de transacción no soportado');
    }
  }

  private async handleDeposit(
    createTransactionDto: CreateTransactionDto,
    accountId: number,
  ) {
    const { type, amount, description } = createTransactionDto;

    const account = await this.prisma.account.update({
      where: { id: accountId },
      data: {
        balance: { increment: amount },
        transactions: {
          create: {
            type,
            amount,
            description,
          },
        },
      },
    });
    return account.balance;
  }

  private async handleWithdrawal(dto: CreateTransactionDto) {}

  private async handleTransferReceived(dto: CreateTransactionDto) {}

  private async handleTransferSent(dto: CreateTransactionDto) {}

  private async handleFee(dto: CreateTransactionDto) {}
}
