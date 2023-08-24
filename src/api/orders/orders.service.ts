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
    data: CreateOrderDto,
    tx: PrismaTransactionClient,
  ): Promise<OrderWithId> {
    const orderCreated = await tx.order.create({ data });

    await this.productsService.addOrder(tx, orderCreated);

    return orderCreated;
  }
}
