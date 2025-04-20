import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetDailyLatestChartQueryDto, GetDailyLatestChartResponseDto } from '@metric/dtos';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetDailyLatestChartQuery } from '@metric/queries';

@ApiTags('Charts')
@Controller('charts/metrics/daily-latest')
export class MetricChartController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {}

  @ApiOperation({ description: 'Get daily latest chart' })
  @ApiResponse({type: GetDailyLatestChartResponseDto})
  @Get()
  async getDailyLatestChart(@Query() dto: GetDailyLatestChartQueryDto) {
    return this.queryBus.execute(
      new GetDailyLatestChartQuery(dto),
    );
  }
}