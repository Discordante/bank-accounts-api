import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionType } from '@prisma/client';
import { CardService } from 'src/card/card.service';
import { AccountService } from 'src/account/account.service';

@Injectable()
export class TransactionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cardService: CardService,
    private readonly accountService: AccountService,
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
        return this.handleWithdrawal(
          createTransactionDto,
          relatedAccount.accountId,
        );

      case TransactionType.TRANSFER_RECEIVED:
        return this.handleTransferReceived(createTransactionDto);

      case TransactionType.TRANSFER_SENT:
        return this.handleTransferSent(createTransactionDto);

      case TransactionType.FEE:
        return this.handleFee(createTransactionDto);

      default:
        throw new BadRequestException('Transaction type not supported');
    }
  }

  private async handleDeposit(
    createTransactionDto: CreateTransactionDto,
    accountId: number,
  ) {
    const { type, amount, description } = createTransactionDto;

    // TODO: Add transactions
    const account = await this.accountService.update(accountId, {
      balance: { increment: amount },
    });

    await this.prisma.transaction.create({
      data: { type, amount, description, accountId },
    });

    return account.balance;
  }

  private async handleWithdrawal(
    createTransactionDto: CreateTransactionDto,
    accountId: number,
  ) {
    const { type, amount, description } = createTransactionDto;

    // Verificar si hay saldo suficiente
    const existingAccount = await this.accountService.findOne(accountId);
    if (existingAccount.balance < amount) {
      throw new BadRequestException('Insufficient balance');
    }

    // TODO: Add transactions
    const account = await this.accountService.update(accountId, {
      balance: { increment: -amount },
    });

    await this.prisma.transaction.create({
      data: { type, amount, description, accountId },
    });

    return account.balance;
  }

  private async handleTransferReceived(dto: CreateTransactionDto) {}

  private async handleTransferSent(dto: CreateTransactionDto) {}

  private async handleFee(dto: CreateTransactionDto) {}
}
