import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './services/payments.service';
import { PaymentMethodsService } from './services/methods.service';

@Module({
  controllers: [PaymentsController],
  imports: [],
  providers: [PaymentsService, PaymentMethodsService],
  exports: [PaymentsService, PaymentMethodsService],
})
export class PaymentsModule {}
