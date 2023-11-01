import { IsNumber, IsPositive } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty()
  @IsNumber()
  amount!: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  rate!: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  saleId!: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  currencyId!: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  paymentMethodId!: number;
}

export class UpdateOrderDto extends PartialType(CreatePaymentDto) {}

export class PaymentWithId {
  @ApiProperty()
  id: number;

  @ApiProperty()
  amount!: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  currencyId!: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  paymentMethodId!: number;

  @ApiProperty()
  rate!: number;

  @ApiProperty()
  saleId!: number;
}
