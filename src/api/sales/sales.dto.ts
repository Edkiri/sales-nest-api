import {
  IsNotEmpty,
  MaxLength,
  IsInt,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { CreateOrderDto, OrderWithId } from '../orders/orders.dto';
import { Type } from 'class-transformer';
import { CreatePaymentDto, PaymentWithId } from '../payments/payments.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSaleDto {
  @ApiProperty({
    type: [CreateOrderDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderDto)
  orders?: CreateOrderDto[];

  @ApiPropertyOptional()
  @IsOptional()
  @MaxLength(255)
  @IsNotEmpty()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  clientId?: number;

  @ApiPropertyOptional({
    type: [CreatePaymentDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePaymentDto)
  payments?: CreatePaymentDto[];
}

export class UpdateSaleDto {
  @ApiPropertyOptional()
  @IsOptional()
  @MaxLength(255)
  @IsNotEmpty()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  clientId?: number;
}

export class SaleWithId {
  @ApiProperty()
  id!: number;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  clientId?: number;

  @ApiProperty()
  status!: number;

  @ApiPropertyOptional({
    type: [PaymentWithId],
  })
  payments?: PaymentWithId[];

  @ApiPropertyOptional({
    type: [OrderWithId],
  })
  orders?: OrderWithId[];
}
