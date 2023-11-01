import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrenciesService } from './currencies.service';
import { CreateCurrencyDto, CurrencyWithId } from './currencies.dto';

@ApiTags('Currencies')
@Controller('currencies')
export class CurrenciesController {
  constructor(private currenciesService: CurrenciesService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Currency has been successfully created.',
    type: CurrencyWithId,
  })
  async createCurrency(
    @Body() data: CreateCurrencyDto,
  ): Promise<CurrencyWithId> {
    const currency = await this.currenciesService.createOne(data);
    return currency;
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: [CurrencyWithId],
  })
  async findSales() {
    const currencies = await this.currenciesService.find();
    return currencies;
  }
}
