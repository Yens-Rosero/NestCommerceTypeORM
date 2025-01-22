import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  IsOptional,
  IsPositive,
  IsEnum,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { Role } from '../../auth/models/roles.model';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com'
  })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  @ApiProperty({
    description: 'User password',
    minLength: 6,
    maxLength: 20,
    example: 'password123'
  })
  readonly password: string;

  @IsNotEmpty()
  @IsEnum(Role)
  @ApiProperty({
    description: 'User role',
    enum: Role,
    example: Role.CUSTOMER
  })
  readonly role: Role;

  @IsOptional()
  @IsPositive()
  @ApiProperty({
    description: 'Associated customer ID',
    required: false,
    example: 1
  })
  readonly customerId?: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
