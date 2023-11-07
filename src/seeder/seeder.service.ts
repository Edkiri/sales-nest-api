import { Injectable } from '@nestjs/common';
import { CurrenciesService } from 'src/api/currencies/currencies.service';
import CURRENCIES from './data/currencies';
import PAYMENT_METHODS from './data/paymentMethods';
import { PaymentMethodsService } from 'src/api/payments/services/methods.service';
import { ProductsService } from 'src/api/products/products.service';
import PRODUCTS from './data/products';
import { ClientsService } from 'src/api/clients/clients.service';
import CLIENTS from './data/clients';

@Injectable()
export class SeederService {
  constructor(
    private readonly currenciesService: CurrenciesService,
    private readonly paymentMethodsService: PaymentMethodsService,
    private readonly productsService: ProductsService,
    private readonly clientsService: ClientsService,
  ) {}

  async seed() {
    await this.seedCurrencies();
    await this.seedPaymentMethods();
    await this.seedProducts();
    await this.seedClients();
  }

  async seedCurrencies() {
    try {
      for (const currency of CURRENCIES) {
        await this.currenciesService.createOne(currency);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async seedPaymentMethods() {
    try {
      for (const paymentMethod of PAYMENT_METHODS) {
        await this.paymentMethodsService.createOne(paymentMethod);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async seedProducts() {
    try {
      for (const product of PRODUCTS) {
        await this.productsService.createOne(product);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async seedClients() {
    try {
      for (const client of CLIENTS) {
        await this.clientsService.createOne(client);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
