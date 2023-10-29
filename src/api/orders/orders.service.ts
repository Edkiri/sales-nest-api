import { Injectable } from '@nestjs/common';
import { CreateOrderDto, OrderWithId } from './orders.dto';
import { PrismaTransactionClient } from 'src/types';
import { ProductsService } from '../products/products.service';

@Injectable()
export class OrdersService {
  constructor(private productsService: ProductsService) {}

  public async createOrder(
    tx: PrismaTransactionClient,
    data: CreateOrderDto,
  ): Promise<OrderWithId> {
    const orderCreated = await tx.order.create({ data });

    await this.productsService.addOrder(tx, orderCreated);

    return orderCreated;
  }
}
