import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/models/roles.model';

import { CreateOrderItemDto } from '../dtos/order-item.dto';
import { OrderItemService } from '../services/order-item.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('order-items')
@Controller('order-item')
export class OrderItemController {
  constructor(private orderItemService: OrderItemService) {}

  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @Get()
  @ApiOperation({ summary: 'List all order items' })
  findAll() {
    return this.orderItemService.findAll();
  }

  @Roles(Role.CUSTOMER, Role.SELLER)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new order item' })
  create(@Body() data: CreateOrderItemDto) {
    return this.orderItemService.create(data);
  }
}
