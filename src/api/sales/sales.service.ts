import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { PrismaTransactionClient } from 'src/types';
import { SaleStatus } from 'src/enums/sale-status..enum';
import { isAlmostCero } from 'src/utis/functions';
import { Prisma, Sale } from '@prisma/client';
import { SaleFilters } from './sales.dto';

type FindSaleResponse = { sales: Sale[]; totalCount: number };

@Injectable()
export class SalesService {
  constructor(private prisma: PrismaService) {}

  async createOne(
    data: Prisma.SaleCreateInput,
    tx?: PrismaTransactionClient | undefined,
  ): Promise<Sale> {
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
      include: { payments: true, orders: true },
    });
  }

  public async find(filters: SaleFilters): Promise<FindSaleResponse> {
    const query: Prisma.SaleWhereInput = {};

    if (filters.status) {
      query.status = filters.status;
    }

    const parsedSkip = parseInt(filters.offset, 10);
    const parsedOffset = parseInt(filters.limit, 10);

    const options = {
      skip: isNaN(parsedSkip) ? 0 : parsedSkip,
      take: isNaN(parsedOffset) ? 10 : parsedOffset,
    };

    const sales = await this.prisma.sale.findMany({
      where: query,
      include: { payments: true, orders: true, client: true },
      ...options,
    });

    const totalCount = await this.prisma.sale.count({ where: query });

    return {
      sales,
      totalCount,
    };
  }

  public async findOne(saleId: number): Promise<Sale> {
    return this.prisma.sale.findUniqueOrThrow({
      where: { id: saleId },
      include: {
        payments: { include: { currency: true, paymentMethod: true } },
        orders: { include: { product: true } },
        client: true,
      },
    });
  }
}
