import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './sales.dto';

@ApiTags('Sales')
@Controller('sales')
export class SalesController {
  constructor(private salesService: SalesService) {}

  @Post()
  createSale(@Body() data: CreateSaleDto) {
    return this.salesService.createOne(data);
  }
}
