import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

  async create(createAccountDto: any) {
    return this.prisma.account.create({
      data: createAccountDto,
    });
  }

  async findOne(accountId: number) {
    return this.prisma.account.findUnique({
      where: { id: accountId },
    });
  }

  async update(accountId: number, updateAccountDto: any) {
    return this.prisma.account.update({
      where: { id: accountId },
      data: updateAccountDto,
    });
  }
}
