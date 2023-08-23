import { Module } from '@nestjs/common';
import { ClientsModule } from './api/clients/clients.module';
import { DatabaseModule } from './database/prisma.module';
import { ProductsModule } from './api/products/products.module';
import { AccountsModule } from './api/accounts/accounts.module';

@Module({
  imports: [DatabaseModule, ClientsModule, ProductsModule, AccountsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
