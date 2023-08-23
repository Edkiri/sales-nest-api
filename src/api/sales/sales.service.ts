import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateSaleDto } from './sales.dto';
import { OrdersService } from '../orders/orders.service';
import { PrismaTransactionClient } from 'src/types';
import { SaleStatus } from 'src/enums/sale-status..enum';
import { isAlmostCero } from 'src/utis/functions';

@Injectable()
export class SalesService {
  constructor(
    private prisma: PrismaService,
    private ordersService: OrdersService,
  ) {}

  async createOne(data: CreateSaleDto) {
    const { orders, payments, ...saleData } = data;

    try {
      return await this.prisma.$transaction(async (tx) => {
        const createdSale = await tx.sale.create({ data: { ...saleData } });

        const updateProducts = orders.map(async (order) => {
          return this.ordersService.createOrder(
            { ...order, saleId: createdSale.id },
            tx,
          );
        });
        await Promise.all(updateProducts);

        // const updateAccounts = payments?.map(async (payment) => {
        //   return this.paymentService.createPayment(payment, tx);
        // });
        // await Promise.all(updateAccounts || []);

        // Check for sale status
        const newSale = await this.checkSaleStatus(createdSale.id, tx);

        return newSale;
      });
    } catch (error) {
      throw error;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  public async checkSaleStatus(saleId: number, tx: PrismaTransactionClient) {
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
