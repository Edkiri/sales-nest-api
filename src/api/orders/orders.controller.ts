import {
  Controller,
  Delete,
  HttpCode,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiNoContentResponse, ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Delete(':orderId')
  @ApiNoContentResponse({
    description: 'Order has been successfully deleted.',
  })
  @HttpCode(204)
  deleteClient(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.ordersService.deleteOne(orderId);
  }
}
