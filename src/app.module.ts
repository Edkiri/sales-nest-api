import { Module } from '@nestjs/common';
import { ClientsModule } from './api/clients/clients.module';
import { DatabaseModule } from './database/prisma.module';
import { ProductsModule } from './api/products/products.module';

@Module({
  imports: [DatabaseModule, ClientsModule, ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
