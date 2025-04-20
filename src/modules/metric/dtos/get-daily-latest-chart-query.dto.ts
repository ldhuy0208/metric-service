import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDateString, IsInt, IsNotEmpty, IsOptional } from "class-validator";

export class GetDailyLatestChartQueryDto {
  @ApiProperty({
    description: 'From date',
    example: new Date(new Date().setDate(new Date().getDate() - 3)),
  })
  @IsDateString()
  @IsNotEmpty()
  fromDate: Date;

  @ApiProperty({
    description: 'To date',
    example: new Date(),
  })
  @IsDateString()
  @IsNotEmpty()
  toDate: Date;

  @ApiProperty({
    description: 'Metric type ID',
    example: 1,
  })
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  metricTypeId: number;

  @ApiPropertyOptional({
    description: 'Unit ID',
    example: 1,
  })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  unitId?: number;
}