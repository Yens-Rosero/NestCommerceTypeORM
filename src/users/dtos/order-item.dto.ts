import { IsNotEmpty, IsPositive, Min } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateOrderItemDto {
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({
    description: 'The ID of the order',
    example: 1
  })
  readonly orderId: number;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({
    description: 'The ID of the product',
    example: 1
  })
  readonly productId: number;

  @IsNotEmpty()
  @IsPositive()
  @Min(1)
  @ApiProperty({
    description: 'Quantity of products',
    minimum: 1,
    example: 1
  })
  readonly quantity: number;
}

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {}
