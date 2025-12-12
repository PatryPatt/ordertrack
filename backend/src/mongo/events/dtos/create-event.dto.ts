import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsObject, IsString } from 'class-validator';

export class CreateEventDto {
  @ApiProperty({ description: 'Tipo de evento', example: 'USER_CREATED' })
  @IsNotEmpty({ message: 'El tipo de evento es obligatorio' })
  @IsString()
  type!: string;

  @ApiProperty({
    description: 'Payload con datos del evento',
    example: { userId: 1 },
  })
  @IsNotEmpty({ message: 'El payload no puede estar vacío' })
  @IsObject()
  payload!: Record<string, any>;

  @ApiProperty({
    description: 'Fuente del evento',
    example: 'api',
    required: false,
  })
  @IsOptional()
  @IsString()
  source?: string;
}
