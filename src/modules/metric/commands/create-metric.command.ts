import { CreateMetricDto } from '@metric/dtos';

export class CreateMetricCommand {
  constructor(
    public payload: CreateMetricDto
  ) {}
}