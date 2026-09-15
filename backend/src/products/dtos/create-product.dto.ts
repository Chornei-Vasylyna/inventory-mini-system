import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { ProductStatus } from '../../../generated/prisma/enums.js';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  quantity!: number;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price!: number;

  @IsEnum(ProductStatus)
  status!: ProductStatus;

  @IsOptional()
  @IsString()
  description?: string;
}