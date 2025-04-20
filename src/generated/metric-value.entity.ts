import { ApiProperty } from '@nestjs/swagger';
import { UnitEntity } from './unit.entity';

export class MetricValueEntity {
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
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  baseUnitId: number;
  @ApiProperty({
    type: () => UnitEntity,
    required: false,
  })
  baseUnit?: UnitEntity;
}
