import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsNumber } from "class-validator";

export class CreateMetricDto {
  @ApiProperty({
    description: 'Unit ID (from public.Unit table',
    example: 1,
    type: 'number',
  })
  @IsInt()
  unitId: number;

  @ApiProperty({
    description: 'The value at the <Record Time> timestamp in <Unit ID> unit',
    example: 100,
    type: 'number',
  })
  @IsNumber()
  value: number;

  @ApiProperty({
    description: 'The timestamp of the metric value',
    example: new Date().toISOString(),
    type: 'string',
  })
  @IsDateString()
  recordedAt: Date;
}
