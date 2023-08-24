import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { OrdersModule } from '../orders/orders.module';
import { PaymentsModule } from '../payments/payments.module';

@Module({
  imports: [OrdersModule, PaymentsModule],
  providers: [SalesService],
  controllers: [SalesController],
})
export class SalesModule {}
