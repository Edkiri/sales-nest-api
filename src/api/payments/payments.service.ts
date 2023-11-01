import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './payments.dto';
import { PrismaTransactionClient } from 'src/types';

@Injectable()
export class PaymentsService {
  public async createPayment(
    tx: PrismaTransactionClient,
    data: CreatePaymentDto,
  ) {
    const createdPayment = await tx.payment.create({
      data: {
        currencyId: data.currencyId,
        paymentMethodId: data.paymentMethodId,
        amount: data.amount,
        rate: data.rate,
        saleId: data.saleId,
      },
    });

    return createdPayment;
  }
}
