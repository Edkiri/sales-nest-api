import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  HttpCode,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PaymentMethodsService } from './services/methods.service';
import { CreatePaymentMethodDto, PaymentMethodWithId } from './dtos/methods';
import { PaymentsService } from './services/payments.service';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(
    private paymentsService: PaymentsService,
    private paymentMethodsService: PaymentMethodsService,
  ) {}
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

  @Delete(':paymentId')
  @ApiNoContentResponse({
    description: 'Payment has been successfully deleted.',
  })
  @HttpCode(204)
  deletePayment(@Param('paymentId', ParseIntPipe) paymentId: number) {
    return this.paymentsService.deleteOne(paymentId);
  }
}
