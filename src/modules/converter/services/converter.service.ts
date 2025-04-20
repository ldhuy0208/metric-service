import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Unit } from '@prisma/client';
import { PrismaService } from 'src/database';

@Injectable()
export class ConverterService {
  constructor(private readonly prisma: PrismaService) {}

  async getDisplayUnit(metricTypeId: number, unitId?: number) {
    const displayUnit = unitId
      ? await this.getUnitById(unitId)
      : await this.getBaseUnitByMetricTypeId(metricTypeId);

    if (displayUnit.metricTypeId !== metricTypeId) {
      throw new BadRequestException(
        'Provided Unit and Provided Metric Type ID do not match',
      );
    }
    return displayUnit;
  }

  async getBaseUnitByMetricTypeId(metricTypeId: number): Promise<Unit> {
    const baseUnit = await this.prisma.unit.findFirst({
      where: {
        metricTypeId,
        isBase: true,
      },
    });

    if (!baseUnit) {
      throw new InternalServerErrorException('Base unit not found');
    }

    return baseUnit as unknown as Unit;
  }

  async getUnitById(unitId: number): Promise<Unit> {
    const unit = await this.prisma.unit.findFirst({
      where: {
        id: unitId,
      },
    });
    if (!unit) {
      throw new BadRequestException('Not found provided Unit');
    }

    return unit as unknown as Unit;
  }

  convertToBase(value: number, unit: Unit) {
    return eval(unit.toBaseFormula.replace('value', value.toString()));
  }

  convertFromBase(value: number, unit: Unit) {
    return eval(unit.fromBaseFormula.replace('value', value.toString()));
  }
}
