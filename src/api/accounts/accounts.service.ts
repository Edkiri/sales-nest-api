import { BadRequestException, Injectable } from '@nestjs/common';
import { Account, Payment, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateAccountDto } from './accounts.dto';
import { PrismaTransactionClient } from 'src/types';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  async findOne(accountId: number): Promise<Account> {
    return this.prisma.account.findUniqueOrThrow({ where: { id: accountId } });
  }

  async createOne(data: Prisma.AccountCreateInput): Promise<Account> {
    return this.prisma.account.create({ data });
  }

  async findAll(): Promise<Account[]> {
    return this.prisma.account.findMany();
  }

  async updateOne(accountId: number, data: UpdateAccountDto): Promise<Account> {
    return this.prisma.account.update({
      where: { id: accountId },
      data,
    });
  }

  async deleteOne(accountId: number): Promise<void> {
    await this.prisma.account.delete({ where: { id: accountId } });
    return;
  }

  public async addPayment(tx: PrismaTransactionClient, payment: Payment) {
    const account = await tx.account.findUniqueOrThrow({
      where: { id: payment.accountId },
    });

    const total = payment.rate * payment.amount;
    const totalAccount = account.amount + total;

    if (totalAccount < 0) {
      throw new BadRequestException(`Not enough money on this account`);
    }

    return await tx.account.update({
      where: { id: account.id },
      data: { amount: { increment: total } },
    });
  }
}
