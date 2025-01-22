import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
  ) {}

  async findAll() {
    return this.orderRepo.find({
      relations: ['items', 'items.product', 'customer'],
    });
  }

  async findOne(id: number) {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['items', 'items.product', 'customer'],
    });

    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }

    return order;
  }

  async create(data: CreateOrderDto) {
    const customer = await this.customerRepo.findOne({
      where: { id: data.customerId },
    });

    if (!customer) {
      throw new NotFoundException(`Customer #${data.customerId} not found`);
    }

    const order = this.orderRepo.create({
      customer,
      items: [],
    });

    return this.orderRepo.save(order);
  }

  async update(id: number, changes: UpdateOrderDto) {
    const order = await this.findOne(id);

    if (changes.customerId) {
      const customer = await this.customerRepo.findOne({
        where: { id: changes.customerId },
      });
      if (!customer) {
        throw new NotFoundException(`Customer #${changes.customerId} not found`);
      }
      order.customer = customer;
    }

    return this.orderRepo.save(order);
  }

  async remove(id: number) {
    const order = await this.findOne(id);
    return this.orderRepo.remove(order);
  }

  async ordersByCustomer(customerId: number) {
    const orders = await this.orderRepo.find({
      where: {
        customer: { id: customerId },
      },
      relations: ['items', 'items.product'],
    });

    if (!orders.length) {
      throw new NotFoundException(`No orders found for customer #${customerId}`);
    }

    return orders;
  }
}
