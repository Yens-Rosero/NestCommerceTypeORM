import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsArray,
  IsOptional,
  Min,
  ValidateIf,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Nombre del producto', example: 'Smartphone XYZ' })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Descripción detallada del producto', example: 'Un smartphone de última generación...' })
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'Precio del producto', example: 599.99 })
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'Cantidad disponible en inventario', example: 100 })
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({ description: 'URL de la imagen del producto', example: 'https://example.com/image.jpg' })
  readonly image: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'ID de la marca del producto', example: 1 })
  readonly brandId: number;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ description: 'Array de IDs de categorías', example: [1, 2, 3] })
  readonly categoriesIds: number[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductsDto {
  @IsOptional()
  @IsPositive()
  @ApiProperty({ required: false, description: 'Límite de resultados por página', example: 10 })
  readonly limit?: number;

  @IsOptional()
  @Min(0)
  @ApiProperty({ required: false, description: 'Número de resultados a saltar', example: 0 })
  readonly offset?: number;

  @IsOptional()
  @IsPositive()
  @ApiProperty({ required: false, description: 'Precio mínimo para filtrar', example: 100 })
  readonly minPrice?: number;

  @ValidateIf((params) => params.minPrice)
  @IsPositive()
  @ApiProperty({ required: false, description: 'Precio máximo para filtrar', example: 1000 })
  readonly maxPrice?: number;
}
