import { Controller, Get, Post, Body, Query, UseInterceptors } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateMetricCommand } from '../commands/create-metric.command';
import { GetMetricsQuery } from '../queries/get-metrics.query';
import { CreateMetricDto, GetDailyLatestChartQueryDto, GetMetricsQueryDto as GetMetricsQueryDto } from '@metric/dtos';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PaginatedResponseInterceptor } from '@interceptors/paginated-response.interceptor';
import { GetMetricsResponseDto } from '@metric/dtos';
import { MetricValueDto } from 'src/generated';
import { GetDailyLatestChartQuery } from '@metric/queries/get-daily-latest-chart.query';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Metrics')
@Controller('metrics')
export class MetricController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiOperation({ description: 'Create a metric' })
  @ApiResponse({type: MetricValueDto})
  @Post()
  async createMetric(@Body() dto: CreateMetricDto) {
    return this.commandBus.execute(
      new CreateMetricCommand(dto),
    );
  }

  @ApiOperation({ description: 'Get metrics' })
  @UseInterceptors(PaginatedResponseInterceptor)
  @ApiResponse({type: GetMetricsResponseDto})
  @Get()
  async getMetrics(@Query() dto: GetMetricsQueryDto) {
    return this.queryBus.execute(
      new GetMetricsQuery(dto),
    );
  }
}