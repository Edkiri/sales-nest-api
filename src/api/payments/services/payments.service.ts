import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from '../dtos/payments.dto';
import { PrismaTransactionClient } from 'src/types';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}
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

  public async deleteOne(paymentId: number) {
    await this.prisma.order.findFirstOrThrow({
      where: { id: paymentId },
    });

    await this.prisma.order.delete({ where: { id: paymentId } });

    return;
  }
}
