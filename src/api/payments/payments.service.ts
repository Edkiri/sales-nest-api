import { Injectable } from '@nestjs/common';
import { CreatePaymentDto, PaymentWithId } from './payments.dto';
import { PrismaTransactionClient } from 'src/types';
import { AccountsService } from '../accounts/accounts.service';

@Injectable()
export class PaymentsService {
  constructor(private accountsService: AccountsService) {}

  public async createPayment(
    tx: PrismaTransactionClient,
    data: CreatePaymentDto,
  ): Promise<PaymentWithId> {
    const createdPayment = await tx.payment.create({ data });

    await this.accountsService.addPayment(tx, createdPayment);

    return createdPayment;
  }
}
