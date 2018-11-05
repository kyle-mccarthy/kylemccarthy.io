import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniqueValidator } from '@src/common/validation/unique/unique.validator';
import { RenderModule } from 'nest-next';
import { ApiModule } from './api/api.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { EmailNotificationService } from './notificatiom/email/email-notification.service';
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
  ],
  controllers: [AppController],
  providers: [AppService, EmailNotificationService],
})
export class AppModule {}
