import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BasePaginatedQueryDto } from '@shared/dtos';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class GetMetricsQueryDto extends BasePaginatedQueryDto {
  @ApiProperty({
    description: 'Metric type ID',
    example: 1,
  })
  @IsInt()
  @Type(() => Number)
  metricTypeId: number;

  @ApiPropertyOptional({
    description: 'Unit id',
    example: 1,
  })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  unitId?: number;
}
