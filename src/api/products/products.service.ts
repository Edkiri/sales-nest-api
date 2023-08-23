import { Injectable, BadRequestException } from '@nestjs/common';
import { Product, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateProductDto } from './products.dto';
import { OrderWithId } from '../orders/orders.dto';
import { PrismaTransactionClient } from 'src/types';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findOne(productId: number): Promise<Product> {
    return this.prisma.product.findUniqueOrThrow({ where: { id: productId } });
  }

  async createOne(data: Prisma.ProductCreateInput): Promise<Product> {
    return this.prisma.product.create({ data });
  }

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async updateOne(productId: number, data: UpdateProductDto): Promise<Product> {
    return this.prisma.product.update({
      where: { id: productId },
      data,
    });
  }

  async deleteOne(productId: number): Promise<void> {
    await this.prisma.product.delete({ where: { id: productId } });
    return;
  }

  async addOrder(order: OrderWithId, tx?: PrismaTransactionClient | undefined) {
    const prismaClient = tx || this.prisma;

    const product = await prismaClient.product.findFirstOrThrow({
      where: { id: order.productId },
    });

    // Check if there are enough items in inventory
    const totalStock = product.stock - order.quantity;
    if (totalStock < 0)
      throw new BadRequestException(
        `There are not enough '${product.name}' in inventory`,
      );

    return await prismaClient.product.update({
      where: {
        id: order.productId,
      },
      data: {
        stock: {
          decrement: order.quantity,
        },
      },
    });
  }
}
