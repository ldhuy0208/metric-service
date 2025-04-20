import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMetricsQuery } from '../get-metrics.query';
import { ConverterService } from 'src/modules/converter/services';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@database/services';
import { GetMetricsResponseDto } from '@metric/dtos';

@QueryHandler(GetMetricsQuery)
export class GetMetricsHandler implements IQueryHandler<GetMetricsQuery> {
  constructor(
    private readonly converterService: ConverterService,
    private readonly prisma: PrismaService,
  ) {}

  async execute(query: GetMetricsQuery): Promise<GetMetricsResponseDto> {
    const {
      payload: { metricTypeId, unitId, skip, take },
    } = query;

    const whereCondition: Prisma.MetricValueWhereInput = {
      baseUnit: {
        metricTypeId,
      },
    };

    const [total, metricValues] = await Promise.all([
      this.prisma.metricValue.count({
        where: whereCondition,
      }),
      this.prisma.metricValue.findMany({
        where: whereCondition,
        skip,
        take,
      }),
    ]);

    const displayUnit = await this.converterService.getDisplayUnit(metricTypeId, unitId);

    return {
      skip,
      take,
      total,
      data: metricValues.map((metricValue) => ({
        ...metricValue,
        displayValue: this.converterService.convertFromBase(
          metricValue.baseValue,
          displayUnit,
        ),
        displayUnit,
      })),
    };
  }
}
