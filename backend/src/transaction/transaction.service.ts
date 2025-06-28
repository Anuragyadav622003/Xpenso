import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto/update-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTransactionDto, userId: number) {
    return this.prisma.transaction.create({
      data: {
        ...dto,
        userId,  // Make sure your Prisma schema has `userId` field in Transaction model
      },
    });
  }

  async findAll(userId: number) {
    
    const response = await this.prisma.transaction.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });
    console.log(response)
    return response;
  }

  async findOne(id: string, userId: number) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
    });

    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    if (transaction.userId !== userId) {
      throw new ForbiddenException(`You do not have access to this transaction`);
    }

    return transaction;
  }

  async update(id: string, dto: UpdateTransactionDto, userId: number) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
    });

    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    if (transaction.userId !== userId) {
      throw new ForbiddenException(`You do not have access to update this transaction`);
    }

    return this.prisma.transaction.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string, userId: number) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
    });

    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    if (transaction.userId !== userId) {
      throw new ForbiddenException(`You do not have access to delete this transaction`);
    }

    return this.prisma.transaction.delete({
      where: { id },
    });
  }
}
