import { GetMetricsQueryDto } from "@metric/dtos";

export class GetMetricsQuery {
  constructor(
    public readonly payload: GetMetricsQueryDto,
  ) {}
}
