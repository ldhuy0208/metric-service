import { Global, Module } from '@nestjs/common';
import * as services from './services';

@Global()
@Module({
  providers: [...Object.values(services)],
  exports: [...Object.values(services)],
})
export class SharedModule {}
