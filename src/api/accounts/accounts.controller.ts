import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import {
  AccountWithId,
  CreateAccountDto,
  UpdateAccountDto,
} from './accounts.dto';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Account } from '@prisma/client';

@ApiTags('Accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Account has been successfully created.',
    type: AccountWithId,
  })
  createAccount(@Body() data: CreateAccountDto): Promise<Account> {
    return this.accountsService.createOne(data);
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: [AccountWithId],
  })
  findAccounts() {
    return this.accountsService.findAll();
  }

  @Get(':accountId')
  @ApiResponse({
    status: 200,
    type: AccountWithId,
  })
  findAccount(@Param('accountId', ParseIntPipe) accountId: number) {
    return this.accountsService.findOne(accountId);
  }

  @Put(':accountId')
  @ApiResponse({
    status: 200,
    type: AccountWithId,
  })
  updateAccount(
    @Param('accountId', ParseIntPipe) accountId: number,
    @Body() data: UpdateAccountDto,
  ) {
    return this.accountsService.updateOne(accountId, data);
  }

  @Delete(':accountId')
  @ApiNoContentResponse({
    description: 'Account has been successfully deleted.',
  })
  @HttpCode(204)
  deleteAccount(@Param('accountId', ParseIntPipe) accountId: number) {
    return this.accountsService.deleteOne(accountId);
  }
}
