import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OrderItem } from '../entities/order-product.entity';
import { Order } from '../entities/order.entity';
import { Product } from '../../products/entities/product.entity';
import { CreateOrderItemDto } from '../dtos/order-item.dto';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepo: Repository<OrderItem>,
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async findAll() {
    return this.orderItemRepo.find({
      relations: ['order', 'product'],
    });
  }

  async create(data: CreateOrderItemDto) {
    const order = await this.orderRepo.findOne({
      where: { id: data.orderId },
    });
    if (!order) {
      throw new NotFoundException(`Order #${data.orderId} not found`);
    }

    const product = await this.productRepo.findOne({
      where: { id: data.productId },
    });
    if (!product) {
      throw new NotFoundException(`Product #${data.productId} not found`);
    }

    const newOrderItem = this.orderItemRepo.create({
      order,
      product,
      quantity: data.quantity,
    });

    return this.orderItemRepo.save(newOrderItem);
  }
}
