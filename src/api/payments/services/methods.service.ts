import { Injectable } from '@nestjs/common';
import { CreatePaymentMethodDto } from '../dtos/methods';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PaymentMethodsService {
  constructor(private prisma: PrismaService) {}
  public async createOne(data: CreatePaymentMethodDto) {
    const createdPayment = await this.prisma.paymentMethod.create({
      data: {
        currencyId: data.currencyId,
        name: data.name,
      },
    });

    return createdPayment;
  }

  public async find() {
    const methods = await this.prisma.paymentMethod.findMany();
    return methods;
  }
}
