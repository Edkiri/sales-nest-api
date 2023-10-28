import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Module({
  imports: [],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
