import { Module } from '@nestjs/common';
import { ClientsModule } from './api/clients/clients.module';
import { DatabaseModule } from './database/prisma.module';

@Module({
  imports: [DatabaseModule, ClientsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
