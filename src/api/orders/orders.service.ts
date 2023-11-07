import { Injectable } from '@nestjs/common';
import { CreateOrderDto, OrderWithId } from './orders.dto';
import { PrismaTransactionClient } from 'src/types';
import { ProductsService } from '../products/products.service';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private productsService: ProductsService,
  ) {}

  public async createOrder(
    tx: PrismaTransactionClient,
    data: CreateOrderDto,
  ): Promise<OrderWithId> {
    const orderCreated = await tx.order.create({ data });

    await this.productsService.addOrder(tx, orderCreated);

    return orderCreated;
  }

  public async deleteOne(orderId: number) {
    const order = await this.prisma.order.findFirstOrThrow({
      where: { id: orderId },
    });

    await this.productsService.removeOrder(order);

    await this.prisma.order.delete({ where: { id: orderId } });

    return;
  }
}
