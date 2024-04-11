import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Account, Card, CardType, TransactionType } from '@prisma/client';
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
    let relatedCard = null;
    let relatedAccount = null;

    if (
      createTransactionDto.type === TransactionType.DEPOSIT ||
      createTransactionDto.type === TransactionType.WITHDRAWAL
    ) {
      relatedCard = await this.cardService.findOne(createTransactionDto.cardId);
      if (!relatedCard.isActive) {
        await this.cardService.updateCardById(relatedCard.id, {
          isActive: true,
        });
      }
    }

    // TODO: check pin

    relatedAccount = await this.accountService.findOne(relatedCard.accountId);

    if (!relatedAccount) {
      throw new NotFoundException(
        'There are no accounts associated with the card',
      );
    }

    switch (createTransactionDto.type) {
      case TransactionType.DEPOSIT:
        return this.handleDeposit(createTransactionDto, relatedAccount.id);

      case TransactionType.WITHDRAWAL:
        return this.handleWithdrawal(
          createTransactionDto,
          relatedAccount,
          relatedCard,
        );

      case TransactionType.TRANSFER_SENT:
        return this.handleTransferSent(relatedAccount, createTransactionDto);

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
    account: Account,
    card: Card,
  ) {
    const { type, amount, description } = createTransactionDto;

    if (card.withdrawalLimit < amount) {
      throw new BadRequestException(
        'Card limit is less than the amount you wish to withdraw',
      );
    }

    if (account.balance < amount && card.type !== CardType.CREDIT) {
      throw new BadRequestException('Insufficient balance');
    }

    // TODO: Add transactions
    const accountUpdated = await this.accountService.update(account.id, {
      balance: { increment: -amount },
    });

    await this.prisma.transaction.create({
      data: { type, amount, description, accountId: account.id },
    });

    return accountUpdated.balance;
  }

  private async handleTransferSent(
    ownerAccount: Account,
    createTransactionDto: CreateTransactionDto,
  ) {
    const { amount, description, externalAccountIBAN } = createTransactionDto;

    if (ownerAccount.balance < amount) {
      throw new BadRequestException('Insufficient balance');
    }

    await this.prisma.account.update({
      where: { iban: externalAccountIBAN },
      data: {
        balance: { increment: amount },
        transactions: {
          create: { type: 'TRANSFER_RECEIVED', amount, description },
        },
      },
    });

    const account = await this.prisma.account.update({
      where: { id: ownerAccount.id },
      data: {
        balance: { increment: -amount },
        transactions: {
          create: { type: 'TRANSFER_SENT', amount, description },
        },
      },
    });

    // TODO: Add transactions

    return account.balance;
  }

  private async handleFee(dto: CreateTransactionDto) {}
}
