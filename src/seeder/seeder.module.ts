import { Module } from '@nestjs/common';
import { CurrenciesModule } from 'src/api/currencies/currencies.module';
import { SeederService } from './seeder.service';
import { DatabaseModule } from 'src/database/prisma.module';
import { PaymentsModule } from 'src/api/payments/payments.module';
import { ProductsModule } from 'src/api/products/products.module';
import { ClientsModule } from 'src/api/clients/clients.module';

@Module({
  imports: [
    DatabaseModule,
    CurrenciesModule,
    PaymentsModule,
    ProductsModule,
    ClientsModule,
  ],
  providers: [SeederService],
})
export class SeederModule {}
