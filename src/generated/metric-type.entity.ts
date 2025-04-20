import { ApiProperty } from '@nestjs/swagger';
import { UnitEntity } from './unit.entity';

export class MetricTypeEntity {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  id: number;
  @ApiProperty({
    type: 'string',
  })
  name: string;
  @ApiProperty({
    type: () => UnitEntity,
    isArray: true,
    required: false,
  })
  units?: UnitEntity[];
}
