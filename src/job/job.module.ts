import { Module, OnModuleDestroy } from '@nestjs/common';
import { JobService } from './job.service';

@Module({
  providers: [JobService],
  exports: [JobService],
})
export class JobModule implements OnModuleDestroy {
  constructor(private readonly service: JobService) {}

  public async onModuleDestroy() {
    await this.service.shutdown();
  }
}
