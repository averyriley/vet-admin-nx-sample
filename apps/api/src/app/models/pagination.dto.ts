import { IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationDTO {
  @ApiPropertyOptional()
  @IsOptional()
  public readonly skip: number = 0;

  @IsOptional()
  @ApiPropertyOptional()
  public readonly limit: number = 10;
}
