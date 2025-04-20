import { ApiProperty } from '@nestjs/swagger';

export class UnitDto {
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
}
