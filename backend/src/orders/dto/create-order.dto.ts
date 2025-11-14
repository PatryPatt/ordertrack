import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    example: 'Orden de prueba',
    description: 'Descripción de la orden',
  })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({
    example: 1,
    description: 'ID del usuario asociado a la orden',
  })
  @IsInt()
  userId!: number;
}
