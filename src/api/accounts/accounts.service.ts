import { Injectable } from '@nestjs/common';
import { Account, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateAccountDto } from './accounts.dto';

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
}
