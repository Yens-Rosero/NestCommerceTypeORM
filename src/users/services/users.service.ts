import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { CustomersService } from './customers.service';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private customersService: CustomersService,
  ) {}

  async findAll() {
    return this.userRepository.find({
      relations: ['customer'],
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['customer'],
    });

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return user;
  }

  async create(data: CreateUserDto) {
    const existingUser = await this.findByEmail(data.email);
    if (existingUser) {
      throw new BadRequestException(`Email ${data.email} already exists`);
    }

    const newUser = this.userRepository.create(data);
    const hashPassword = await bcrypt.hash(data.password, 10);
    newUser.password = hashPassword;

    if (data.customerId) {
      const customer = await this.customersService.findOne(data.customerId);
      newUser.customer = customer;
    }

    return this.userRepository.save(newUser);
  }

  async update(id: number, changes: UpdateUserDto) {
    const user = await this.findOne(id);
    const updatedChanges = { ...changes };

    if (updatedChanges.email && updatedChanges.email !== user.email) {
      const existingUser = await this.findByEmail(updatedChanges.email);
      if (existingUser) {
        throw new BadRequestException(`Email ${updatedChanges.email} already exists`);
      }
    }

    if (updatedChanges.password) {
      updatedChanges.password = await bcrypt.hash(updatedChanges.password, 10);
    }

    if (updatedChanges.customerId) {
      const customer = await this.customersService.findOne(updatedChanges.customerId);
      user.customer = customer;
    }

    this.userRepository.merge(user, updatedChanges);
    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.userRepository.remove(user);
  }

  async getOrderByUser(id: number) {
    const user = await this.findOne(id);
    return this.userRepository.findOne({
      where: { id: user.id },
      relations: ['customer', 'customer.orders', 'customer.orders.items'],
    });
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      relations: ['customer'],
    });
  }
}
