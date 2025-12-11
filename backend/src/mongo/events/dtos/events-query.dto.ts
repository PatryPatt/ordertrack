import { IsOptional, IsString, IsNumberString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class EventsQueryDto {
  @ApiPropertyOptional({ description: 'Tipo de evento' })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({ description: 'ID de usuario dentro del payload' })
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiPropertyOptional({ description: 'Fuente del evento' })
  @IsOptional()
  @IsString()
  source?: string;

  @ApiPropertyOptional({ description: 'Límite de resultados (default: 50)' })
  @IsOptional()
  @IsNumberString()
  limit?: string;

  @ApiPropertyOptional({ description: 'Offset de resultados, para paginación' })
  @IsOptional()
  @IsNumberString()
  skip?: string;
}
