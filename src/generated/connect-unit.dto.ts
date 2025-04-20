import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UnitUqUnitMetricTypeIdNameUniqueInputDto {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  @IsNotEmpty()
  @IsInt()
  metricTypeId: number;
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
export class UnitUqUnitMetricTypeIdSymbolUniqueInputDto {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  @IsNotEmpty()
  @IsInt()
  metricTypeId: number;
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  symbol: string;
}

@ApiExtraModels(
  UnitUqUnitMetricTypeIdNameUniqueInputDto,
  UnitUqUnitMetricTypeIdSymbolUniqueInputDto,
)
export class ConnectUnitDto {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    required: false,
  })
  @IsOptional()
  @IsInt()
  id?: number;
  @ApiProperty({
    type: UnitUqUnitMetricTypeIdNameUniqueInputDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UnitUqUnitMetricTypeIdNameUniqueInputDto)
  uq_unit_metric_type_id_name?: UnitUqUnitMetricTypeIdNameUniqueInputDto;
  @ApiProperty({
    type: UnitUqUnitMetricTypeIdSymbolUniqueInputDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UnitUqUnitMetricTypeIdSymbolUniqueInputDto)
  uq_unit_metric_type_id_symbol?: UnitUqUnitMetricTypeIdSymbolUniqueInputDto;
}
