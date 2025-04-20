import { ConverterModule } from '@converter/converter.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import * as commandHandlers from './commands/handlers';
import * as queryHandlers from './queries/handlers';
import * as controllers from './controllers';

@Module({
  imports: [CqrsModule, ConverterModule],
  controllers: [...Object.values(controllers)],
  providers: [
    ...Object.values(commandHandlers),
    ...Object.values(queryHandlers),
  ],
})
export class MetricModule {}
