import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Fullstack javascript (Nestjs + react)';
  }
}
