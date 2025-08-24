import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async list() {
    return this.prisma.product.findMany({
      where: { active: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async get(id: string) {
    return this.prisma.product.findUnique({ where: { id } });
  }
}
