import { ApiProperty } from "@nestjs/swagger";
import { PaginatedResponseDto } from "@shared/dtos";
import { MetricValueDto, UnitDto } from "src/generated";

class GetMetricResponseDto extends MetricValueDto {
  @ApiProperty({
    type: 'number',
  })
  displayValue: number;

  @ApiProperty({
    type: UnitDto,
  })
  displayUnit: UnitDto;
}

export class GetMetricsResponseDto extends PaginatedResponseDto<GetMetricResponseDto> {
  @ApiProperty({
    isArray: true,
    type: GetMetricResponseDto,
  })
  declare data: GetMetricResponseDto[];
}