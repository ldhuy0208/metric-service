import { ApiProperty } from '@nestjs/swagger';
import { MetricTypeEntity } from './metric-type.entity';
import { MetricValueEntity } from './metric-value.entity';

export class UnitEntity {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  id: number;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  metricTypeId: number;
  @ApiProperty({
    type: 'string',
  })
  name: string;
  @ApiProperty({
    type: 'string',
  })
  symbol: string;
  @ApiProperty({
    type: 'boolean',
  })
  isBase: boolean;
  @ApiProperty({
    type: 'string',
  })
  toBaseFormula: string;
  @ApiProperty({
    type: 'string',
  })
  fromBaseFormula: string;
  @ApiProperty({
    type: () => MetricTypeEntity,
    required: false,
  })
  metricType?: MetricTypeEntity;
  @ApiProperty({
    type: () => MetricValueEntity,
    isArray: true,
    required: false,
  })
  metricValues?: MetricValueEntity[];
}
