import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  IsNumber,
  IsPositive,
  IsBoolean,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  reference!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @IsPositive()
  stock?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  brand?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class ProductWithId {
  @ApiProperty()
  id: number;

  @ApiProperty()
  reference!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  stock!: number;

  @ApiPropertyOptional()
  price?: number;

  @ApiPropertyOptional()
  brand?: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty()
  isActive!: boolean;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export type ProductFilters = {
  name?: string;
  reference?: string;
  isActive?: string;
  limit?: number;
  offset?: number;
};
