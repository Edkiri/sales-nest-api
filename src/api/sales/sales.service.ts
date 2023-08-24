import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { SaleWithId } from './sales.dto';
import { PrismaTransactionClient } from 'src/types';
import { SaleStatus } from 'src/enums/sale-status..enum';
import { isAlmostCero } from 'src/utis/functions';
import { Prisma } from '@prisma/client';

@Injectable()
export class SalesService {
  constructor(private prisma: PrismaService) {}

  async createOne(
    data: Prisma.SaleCreateInput,
    tx?: PrismaTransactionClient | undefined,
  ): Promise<SaleWithId> {
    const prismaClient = tx || this.prisma;
    return await prismaClient.sale.create({ data });
  }

  public async checkSaleStatus(tx: PrismaTransactionClient, saleId: number) {
    const saleToCheck = await tx.sale.findFirstOrThrow({
      where: { id: saleId },
      include: { payments: true, orders: true },
    });
    const totalOrders = saleToCheck.orders.reduce((prev, order) => {
      return prev + order.price * order.quantity;
    }, 0);
    const totalPayments = saleToCheck.payments.reduce((prev, payment) => {
      return prev + payment.amount / payment.rate;
    }, 0);
    const totalSale = totalOrders - totalPayments;

    let status: SaleStatus = SaleStatus.UNPAID;
    if (totalSale < 0) {
      status = SaleStatus.REFUNDING;
    }
    if (isAlmostCero(totalSale)) {
      status = SaleStatus.FINISHED;
    }

    return tx.sale.update({
      where: { id: saleId },
      data: {
        status,
      },
    });
  }
}
