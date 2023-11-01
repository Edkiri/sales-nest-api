import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaymentMethodsService } from './services/methods.service';
import { CreatePaymentMethodDto, PaymentMethodWithId } from './dtos/methods';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private paymentMethodsService: PaymentMethodsService) {}
  @Post('methods')
  @ApiCreatedResponse()
  async createPaymentMethod(
    @Body() data: CreatePaymentMethodDto,
  ): Promise<PaymentMethodWithId> {
    const paymentMethod = await this.paymentMethodsService.createOne(data);
    return paymentMethod;
  }
  @Get('methods')
  @ApiResponse({
    status: 200,
    type: [PaymentMethodWithId],
  })
  async findSales() {
    const methods = await this.paymentMethodsService.find();
    return methods;
  }
}
