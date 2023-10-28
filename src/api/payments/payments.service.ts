import { Injectable } from '@nestjs/common';
import { CreatePaymentDto, PaymentWithId } from './payments.dto';
import { PrismaTransactionClient } from 'src/types';

@Injectable()
export class PaymentsService {
  public async createPayment(
    tx: PrismaTransactionClient,
    data: CreatePaymentDto,
  ): Promise<PaymentWithId> {
    const createdPayment = await tx.payment.create({ data });

    return createdPayment;
  }
}
