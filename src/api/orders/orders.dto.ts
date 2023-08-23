import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  quantity!: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  price!: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  productId!: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  saleId!: number;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}

export class OrderWithId {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  quantity!: number;

  @ApiProperty()
  price!: number;

  @ApiProperty()
  productId!: number;

  @ApiProperty()
  saleId!: number;
}
