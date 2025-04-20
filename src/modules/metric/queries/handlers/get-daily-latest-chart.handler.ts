import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ConverterService } from 'src/modules/converter/services';
import { PrismaService } from '@database/services';
import { GetDailyLatestChartResponseDto } from '@metric/dtos';
import { GetDailyLatestChartQuery } from '../get-daily-latest-chart.query';
import { Prisma } from '@prisma/client';

@QueryHandler(GetDailyLatestChartQuery)
export class GetDailyLatestChartHandler
  implements IQueryHandler<GetDailyLatestChartQuery>
{
  constructor(
    private readonly converterService: ConverterService,
    private readonly prisma: PrismaService,
  ) {}

  async execute(
    query: GetDailyLatestChartQuery,
  ): Promise<GetDailyLatestChartResponseDto> {
    const { fromDate, toDate, metricTypeId, unitId } = query.payload;

    const startDate = new Date(fromDate);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(toDate);
    endDate.setHours(23, 59, 59, 999);

    const displayUnit = await this.converterService.getDisplayUnit(
      metricTypeId,
      unitId,
    );

    const rawQuery = Prisma.sql`
      WITH RankedMetrics AS (
        SELECT 
          mv.*,
          u.*,
          DATE(mv.recorded_at) as date_only,
          ROW_NUMBER() OVER (PARTITION BY DATE(mv.recorded_at) ORDER BY mv.recorded_at DESC) as rn
        FROM metric_value mv
        JOIN unit u ON mv.base_unit_id = u.id
        WHERE 
          mv.recorded_at >= ${startDate} AND 
          mv.recorded_at <= ${endDate} AND
          u.metric_type_id = ${metricTypeId}
      )
      SELECT * FROM RankedMetrics WHERE rn = 1 ORDER BY date_only ASC
    `;

    const dailyLatestValues: any[] = await this.prisma.$queryRaw(rawQuery);

    return {
      data: dailyLatestValues.map((value) => ({
        date: value.recorded_at,
        displayValue: this.converterService.convertFromBase(
          value.base_value,
          displayUnit,
        ),
        displayUnit,
      })),
    };
  }
}
