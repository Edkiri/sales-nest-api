import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SalesService } from './sales.service';
import { CreateSaleDto, SaleWithId } from './sales.dto';
import { PrismaService } from 'src/database/prisma.service';
import { OrdersService } from '../orders/orders.service';

@ApiTags('Sales')
@Controller('sales')
export class SalesController {
  constructor(
    private prisma: PrismaService,
    private salesService: SalesService,
    private ordersService: OrdersService, // private paymentsService: PaymentsService,
  ) {}

  @Post()
  async createSale(@Body() data: CreateSaleDto): Promise<SaleWithId> {
    const { orders, payments, ...saleData } = data;
    try {
      return await this.prisma.$transaction(async (tx) => {
        const saleCreated = await this.salesService.createOne(saleData, tx);

        const updateProducts = orders.map(async (order) => {
          return this.ordersService.createOrder(
            { ...order, saleId: saleCreated.id },
            tx,
          );
        });
        await Promise.all(updateProducts);

        return saleCreated;
      });
    } catch (error) {
      throw error;
    } finally {
      await this.prisma.$disconnect();
    }
  }
}
