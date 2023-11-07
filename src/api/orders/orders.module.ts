import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ProductsModule } from '../products/products.module';
import { OrdersController } from './orders.controller';

@Module({
  controllers: [OrdersController],
  imports: [ProductsModule],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
