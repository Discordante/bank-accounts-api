import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';


import { ApiTags } from '@nestjs/swagger';
import { AccountService } from './account.service';

@ApiTags('Account')
@Controller('account')
export class AccountController {
  constructor(private readonly accountsService: AccountService) {}

  @Post()
  create(@Body() createAccountDto: any) {
    return this.accountsService.create(createAccountDto);
  }

  @Get('/:accountId')
  findOne(@Param('accountId') accountId: string) {
    return this.accountsService.findOne(+accountId);
  }

  @Patch('/:accountId')
  update(@Param('accountId') accountId: string, @Body() updateAccountDto: any) {
    return this.accountsService.update(+accountId, updateAccountDto);
  }
}
