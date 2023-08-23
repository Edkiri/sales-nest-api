import { Injectable } from '@nestjs/common';
import { Product, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateProductDto } from './products.dto';

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
}
