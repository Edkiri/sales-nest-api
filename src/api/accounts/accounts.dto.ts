import { IsEnum, IsNumber, IsString, MinLength } from 'class-validator';
import { Currencies } from '../../enums/currencies.enum';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class CreateAccountDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  name!: string;

  @ApiProperty()
  @IsEnum(Currencies)
  currency!: Currencies;

  @ApiPropertyOptional()
  @IsNumber()
  amount?: number;
}

export class AccountWithId {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name!: string;

  @ApiProperty({
    enum: Currencies,
  })
  currency!: Currencies;

  @ApiPropertyOptional()
  amount?: number;
}

export class UpdateAccountDto extends PartialType(CreateAccountDto) {}
