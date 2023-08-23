import { Injectable } from '@nestjs/common';
import { Client, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateClientDto } from './clients.dto';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  async findOne(clientId: number): Promise<Client> {
    return this.prisma.client.findUniqueOrThrow({ where: { id: clientId } });
  }

  async createOne(data: Prisma.ClientCreateInput): Promise<Client> {
    return await this.prisma.client.create({ data });
  }

  async findAll(): Promise<Client[]> {
    return await this.prisma.client.findMany();
  }

  async updateOne(clientId: number, data: UpdateClientDto): Promise<Client> {
    return await this.prisma.client.update({
      where: { id: clientId },
      data,
    });
  }

  async deleteOne(clientId: number): Promise<void> {
    await this.prisma.client.delete({ where: { id: clientId } });
    return;
  }
}
