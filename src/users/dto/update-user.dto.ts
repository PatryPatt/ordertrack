import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({
    example: 'Nuevo nombre',
    description: 'Nombre actualizado del usuario',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'nuevo@example.com',
    description: 'Correo electrónico actualizado',
  })
  @IsOptional()
  @IsEmail({}, { message: 'El email no tiene un formato válido' })
  email?: string;
}
