import { IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCurrencyDto {
  @ApiProperty()
  @IsString()
  name!: string;
}

export class UpdateCurrencyrDto extends PartialType(CreateCurrencyDto) {}

export class CurrencyWithId {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name!: string;
}
