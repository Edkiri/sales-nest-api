import { Injectable } from '@nestjs/common';
import { Client, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { ClientFilters, UpdateClientDto } from './clients.dto';

type FindClientsResponse = { clients: Client[]; totalCount: number };

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  async findOne(clientId: number): Promise<Client> {
    return this.prisma.client.findUniqueOrThrow({ where: { id: clientId } });
  }

  async createOne(data: Prisma.ClientCreateInput): Promise<Client> {
    return await this.prisma.client.create({ data });
  }

  async findAll(filters: ClientFilters): Promise<FindClientsResponse> {
    const query: Prisma.ClientWhereInput = {};

    if (filters.name) {
      query.name = {
        contains: filters.name,
        mode: 'insensitive',
      };
    }

    const parsedSkip = parseInt(filters.offset, 10);
    const parsedOffset = parseInt(filters.limit, 10);
    const options = {
      skip: isNaN(parsedSkip) ? 0 : parsedSkip,
      take: isNaN(parsedOffset) ? 10 : parsedOffset,
    };

    const clients = await this.prisma.client.findMany({
      where: query,
      ...options,
    });

    const totalCount = await this.prisma.client.count({ where: query });

    return {
      clients,
      totalCount,
    };
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
