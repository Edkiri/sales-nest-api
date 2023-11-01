import { Injectable } from '@nestjs/common';
import { CreateCurrencyDto } from './currencies.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CurrenciesService {
  constructor(private prisma: PrismaService) {}
  public async createOne(data: CreateCurrencyDto) {
    const createdCurrency = await this.prisma.currency.create({
      data: {
        name: data.name,
      },
    });

    return createdCurrency;
  }

  public async find() {
    const currencies = await this.prisma.currency.findMany();
    return currencies;
  }
}
