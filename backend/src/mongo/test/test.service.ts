//Aquí inyectamos el modelo y creamos un método para insertar un documento.

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TestService {
  constructor(@InjectModel('Test') private readonly testModel: Model<any>) {}

  async create() {
    return this.testModel.create({ name: 'hello' });
  }

  async findAll() {
    return this.testModel.find().exec();
  }
}
