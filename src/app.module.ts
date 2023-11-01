import { Module } from '@nestjs/common';
import { ClientsModule } from './api/clients/clients.module';
import { DatabaseModule } from './database/prisma.module';
import { ProductsModule } from './api/products/products.module';
import { SalesModule } from './api/sales/sales.module';
import { OrdersModule } from './api/orders/orders.module';
import { PaymentsModule } from './api/payments/payments.module';
import { CurrenciesModule } from './api/currencies/currencies.module';

@Module({
  imports: [
    DatabaseModule,
    ClientsModule,
    ProductsModule,
    SalesModule,
    OrdersModule,
    PaymentsModule,
    CurrenciesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
