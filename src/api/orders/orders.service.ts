import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateOrderDto, OrderWithId } from './orders.dto';
import { PrismaTransactionClient } from 'src/types';
import { ProductsService } from '../products/products.service';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private productsService: ProductsService,
  ) {}

  public async createOrder(
    orderData: CreateOrderDto,
    tx?: PrismaTransactionClient | undefined,
  ): Promise<OrderWithId> {
    if (!tx) {
      try {
        return await this.prisma.$transaction(async (tx) => {
          return await this.createOrderWithTransaction(orderData, tx);
        });
      } catch (error) {
        throw error;
      } finally {
        await this.prisma.$disconnect();
      }
    }
    return this.createOrderWithTransaction(orderData, tx);
  }

  public async createOrderWithTransaction(
    orderData: CreateOrderDto,
    tx: PrismaTransactionClient,
  ): Promise<OrderWithId> {
    const createdOrder = await tx.order.create({
      data: { ...orderData, saleId: orderData.saleId },
    });

    // update product stock
    await this.productsService.addOrder(createdOrder, tx);

    // Update sale status
    // TODO: research how to circular dependencies
    // await this.saleService.checkSaleStatus(createdOrder.saleId, tx);

    return createdOrder;
  }
}
