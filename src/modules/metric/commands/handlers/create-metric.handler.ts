import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateMetricCommand } from '../create-metric.command';
import { ConverterService } from 'src/modules/converter/services';
import { PrismaService } from '@database/services';
import { MetricValue } from '@prisma/client';

@CommandHandler(CreateMetricCommand)
export class CreateMetricHandler
  implements ICommandHandler<CreateMetricCommand>
{
  constructor(
    private prisma: PrismaService,
    private converterService: ConverterService,
  ) {}

  async execute(command: CreateMetricCommand): Promise<MetricValue> {
    const { payload } = command;
    
    const unit = await this.converterService.getUnitById(payload.unitId);
    const baseUnit = unit.isBase ? unit : await this.converterService.getBaseUnitByMetricTypeId(unit.metricTypeId);

    return this.prisma.metricValue.create({
      data: {
        baseValue: this.converterService.convertToBase(payload.value, unit),
        baseUnitId: baseUnit.id,
        recordedAt: payload.recordedAt,
      },
    });
  }
}
