import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SalesService } from './sales.service';
import { CreateSaleDto, SaleWithId } from './sales.dto';
import { PrismaService } from 'src/database/prisma.service';
import { OrdersService } from '../orders/orders.service';
import { PaymentsService } from '../payments/payments.service';

@ApiTags('Sales')
@Controller('sales')
export class SalesController {
  constructor(
    private prisma: PrismaService,
    private salesService: SalesService,
    private ordersService: OrdersService,
    private paymentsService: PaymentsService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Sale has been successfully created.',
    type: SaleWithId,
  })
  async createSale(@Body() data: CreateSaleDto): Promise<SaleWithId> {
    const { orders, payments, ...saleData } = data;
    try {
      const createdSale = await this.prisma.$transaction(async (tx) => {
        const sale = await this.salesService.createOne(saleData, tx);

        const ordersPromises = orders.map(async (order) => {
          return this.ordersService.createOrder(
            { ...order, saleId: sale.id },
            tx,
          );
        });
        await Promise.all(ordersPromises);

        const paymentsPromises = payments.map((payment) => {
          return this.paymentsService.createPayment(tx, {
            ...payment,
            saleId: sale.id,
          });
        });
        await Promise.all(paymentsPromises);

        return await this.salesService.checkSaleStatus(tx, sale.id);
      });
      return createdSale;
    } catch (error) {
      throw error;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: [SaleWithId],
  })
  async findSales() {
    return this.salesService.find();
  }
}
