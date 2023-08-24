import { IsNumber, IsEnum, IsPositive, IsOptional } from 'class-validator';
import { Currencies } from '../../enums/currencies.enum';
import { PaymentMethods } from '../../enums/payment-methods.enum';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty()
  @IsNumber()
  amount!: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  rate!: number;

  @ApiProperty({
    enum: PaymentMethods,
  })
  @IsEnum(PaymentMethods)
  method!: PaymentMethods;

  @ApiProperty({
    enum: Currencies,
  })
  @IsEnum(Currencies)
  currency!: Currencies;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  saleId!: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  accountId!: number;
}

export class UpdateOrderDto extends PartialType(CreatePaymentDto) {}

export class PaymentWithId {
  @ApiProperty()
  id: number;

  @ApiProperty()
  amount!: number;

  @ApiProperty()
  rate!: number;

  @ApiProperty({
    enum: PaymentMethods,
  })
  method!: PaymentMethods;

  @ApiProperty({
    enum: Currencies,
  })
  currency!: Currencies;

  @ApiProperty()
  saleId!: number;

  @ApiProperty()
  accountId!: number;
}
