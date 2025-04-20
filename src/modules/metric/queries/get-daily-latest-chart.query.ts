import { GetDailyLatestChartQueryDto } from "@metric/dtos";

export class GetDailyLatestChartQuery {
  constructor(
    public readonly payload: GetDailyLatestChartQueryDto,
  ) {}
}
