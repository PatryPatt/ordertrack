//Nos permite comprobar vía HTTP que la conexión funciona.

import { Controller, Get, Post } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post()
  create() {
    return this.testService.create();
  }

  @Get()
  findAll() {
    return this.testService.findAll();
  }
}
