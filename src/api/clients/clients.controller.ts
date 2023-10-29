import {
  Body,
  Controller,
  Get,
  Post,
  ParseIntPipe,
  Put,
  Param,
  Delete,
  HttpCode,
  Query,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import {
  ClientFilters,
  ClientWithId,
  CreateClientDto,
  UpdateClientDto,
} from './clients.dto';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Client } from '@prisma/client';

@ApiTags('Clients')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Client has been successfully created.',
    type: ClientWithId,
  })
  createClient(@Body() data: CreateClientDto): Promise<Client> {
    return this.clientsService.createOne(data);
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: [ClientWithId],
  })
  findClients(@Query() filters: ClientFilters) {
    return this.clientsService.findAll(filters);
  }

  @Get(':clientId')
  @ApiResponse({
    status: 200,
    type: ClientWithId,
  })
  findClient(@Param('clientId', ParseIntPipe) clientId: number) {
    return this.clientsService.findOne(clientId);
  }

  @Put(':clientId')
  @ApiResponse({
    status: 200,
    type: ClientWithId,
  })
  updateClient(
    @Param('clientId', ParseIntPipe) clientId: number,
    @Body() data: UpdateClientDto,
  ) {
    return this.clientsService.updateOne(clientId, data);
  }

  @Delete(':clientId')
  @ApiNoContentResponse({
    description: 'Client has been successfully deleted.',
  })
  @HttpCode(204)
  deleteClient(@Param('clientId', ParseIntPipe) clientId: number) {
    return this.clientsService.deleteOne(clientId);
  }
}
