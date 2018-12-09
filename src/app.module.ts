import { Module, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationProcessor } from '@src/common/jobs/notifications/notification.processor';
import { UniqueValidator } from '@src/common/validation/unique/unique.validator';
import { JobService } from '@src/job/job.service';
import { RenderModule } from 'nest-next';
import { ApiModule } from './api/api.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { JobModule } from './job/job.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    RenderModule,
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, UniqueValidator],
      useExisting: ConfigService,
    }),
    ApiModule,
    NotificationModule,
    JobModule,
  ],
  controllers: [AppController],
  providers: [AppService, NotificationProcessor],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly moduleRef: ModuleRef) {}

  public onModuleInit() {
    // @todo [refactor] look into dynamic jobs module for binding processors
    // @todo [refactor] look into using execution context to run queue rather than main web app
    const jobService = this.moduleRef.get(JobService, { strict: false });
    const notificationProcessor = this.moduleRef.get(NotificationProcessor);

    jobService.registerProcessor(
      notificationProcessor.getName(),
      notificationProcessor.process,
    );
  }
}
