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
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto, UpdateClientDto } from './clients.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  createClient(@Body() data: CreateClientDto) {
    return this.clientsService.createOne(data);
  }

  @Get()
  findClients() {
    return this.clientsService.findAll();
  }

  @Get(':clientId')
  findClient(@Param('clientId', ParseIntPipe) clientId: number) {
    return this.clientsService.findOne(clientId);
  }
  @Put(':clientId')
  updateClient(
    @Param('clientId', ParseIntPipe) clientId: number,
    @Body() data: UpdateClientDto,
  ) {
    return this.clientsService.updateOne(clientId, data);
  }

  @Delete(':clientId')
  @HttpCode(204)
  deleteClient(@Param('clientId', ParseIntPipe) clientId: number) {
    return this.clientsService.deleteOne(clientId);
  }
}
