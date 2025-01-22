import { IsString, IsNotEmpty, IsUrl, MinLength, MaxLength } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({
    description: 'Nombre de la marca',
    example: 'Samsung',
    minLength: 3,
    maxLength: 50
  })
  readonly name: string;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({
    description: 'URL del logo de la marca',
    example: 'https://example.com/logos/samsung.png'
  })
  readonly image: string;
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
