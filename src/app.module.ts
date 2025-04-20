import { Module } from '@nestjs/common';
import { SharedModule } from './modules/shared/shared.module';
import { DatabaseModule } from './database/database.module';
import { MetricModule } from '@metric/metric.module';
import { ConverterModule } from '@converter/converter.module';
import { ConfigModule } from './configs/config.module';

@Module({
  imports: [
    ConfigModule,
    SharedModule,
    DatabaseModule,
    MetricModule,
    ConverterModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
