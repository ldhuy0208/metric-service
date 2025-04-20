import { ApiProperty } from '@nestjs/swagger';

export class MetricValueDto {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  id: number;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  recordedAt: Date;
  @ApiProperty({
    type: 'number',
    format: 'float',
  })
  baseValue: number;
}
