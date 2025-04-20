import { Global, Module } from '@nestjs/common';
import { ConverterService } from './services';

@Global()
@Module({
  imports: [],
  providers: [ConverterService],
  exports: [ConverterService],
})
export class ConverterModule {}
