import { IsNumber, IsPositive, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreatePaymentMethodDto {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  currencyId!: number;
}

export class UpdatePaymentMethodDto extends PartialType(
  CreatePaymentMethodDto,
) {}

export class PaymentMethodWithId {
  @ApiProperty()
  name!: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  currencyId!: number;
}
