import {
  IsNotEmpty,
  IsPositive,
  IsOptional,
  IsArray,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({
    description: 'The ID of the customer',
    example: 1
  })
  readonly customerId: number;

  @IsOptional()
  @IsArray()
  @ApiProperty({
    description: 'Array of order items',
    type: [Number],
    required: false,
    example: [1, 2, 3]
  })
  readonly items?: number[];
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
