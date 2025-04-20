import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResponseDto<T> {
  @ApiProperty({ example: 100 })
  skip: number;

  @ApiProperty({ example: 1000 })
  total: number;

  @ApiProperty({ isArray: true })
  data: T[];

  @ApiProperty({ example: 100 })
  take: number;

  @ApiProperty({ example: true })
  hasNext?: boolean;
}
