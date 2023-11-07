import { Injectable, BadRequestException } from '@nestjs/common';
import { Product, Prisma, Order } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { ProductFilters, UpdateProductDto } from './products.dto';
import { OrderWithId } from '../orders/orders.dto';
import { PrismaTransactionClient } from 'src/types';

type FindProductsResponse = { products: Product[]; totalCount: number };

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findOne(productId: number): Promise<Product> {
    return this.prisma.product.findUniqueOrThrow({ where: { id: productId } });
  }

  async createOne(data: Prisma.ProductCreateInput): Promise<Product> {
    return this.prisma.product.create({ data });
  }

  async findAll(filters: ProductFilters): Promise<FindProductsResponse> {
    const query: Prisma.ProductWhereInput = {};

    if (filters.isActive) {
      query.isActive = filters.isActive === 'false' ? false : true;
    }
    if (filters.name) {
      query.name = {
        contains: filters.name,
        mode: 'insensitive',
      };
    }
    if (filters.reference) {
      query.reference = {
        contains: filters.reference,
      };
    }

    const parsedSkip = parseInt(filters.offset, 10);
    const parsedOffset = parseInt(filters.limit, 10);

    const options = {
      skip: isNaN(parsedSkip) ? 0 : parsedSkip,
      take: isNaN(parsedOffset) ? 10 : parsedOffset,
    };

    const products = await this.prisma.product.findMany({
      where: query,
      skip: options.skip,
      take: options.take,
    });

    const totalCount = await this.prisma.product.count({ where: query });

    return {
      products,
      totalCount,
    };
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

  async addOrder(tx: PrismaTransactionClient, order: OrderWithId) {
    const product = await tx.product.findFirstOrThrow({
      where: { id: order.productId },
    });

    // Check if there are enough items in inventory
    const totalStock = product.stock - order.quantity;
    if (totalStock < 0)
      throw new BadRequestException(
        `There are not enough '${product.name}' in inventory`,
      );

    return await tx.product.update({
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

  async removeOrder(order: Order) {
    return await this.prisma.product.update({
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
