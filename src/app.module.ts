import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniqueValidator } from '@server/common/validation/unique/unique.validator';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import RenderModule from './render/render.module';

@Module({
  imports: [
    RenderModule,
    UserModule,
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, UniqueValidator],
      useExisting: ConfigService,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
