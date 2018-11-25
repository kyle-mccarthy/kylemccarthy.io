import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { parse } from 'dotenv';
import * as fs from 'fs';
import * as joi from 'joi';
import { resolve } from 'path';

export interface EnvConfig {
  [key: string]: any;
}

export interface MailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

@Injectable()
export class ConfigService implements TypeOrmOptionsFactory {
  private readonly envConfig: EnvConfig;

  constructor(path: string = '.env') {
    this.envConfig = this.validateConfig(parse(fs.readFileSync(path)));
  }

  public getConfig() {
    return this.envConfig;
  }

  public get(key: string): any {
    return this.envConfig[key];
  }

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.get('DB'),
      host: this.get('DB_HOST'),
      port: this.get('DB_PORT'),
      username: this.get('DB_USER'),
      password: this.get('DB_PASS'),
      database: this.get('DB_NAME'),
      synchronize: this.get('DB_SYNC'),
      entities: [`${__dirname}/../**/*.entity.ts`],
      dropSchema: this.get('DB_DROP'),
    };
  }

  public getMailConfig() {
    return {
      host: this.get('SMTP_HOST'),
      port: this.get('SMTP_PORT'),
      secure: this.get('SMTP_SECURE'),
      auth: {
        user: this.get('SMTP_USER'),
        pass: this.get('SMTP_PASS'),
      },
    };
  }

  private validateConfig(envConfig: EnvConfig): EnvConfig {
    const schema: joi.ObjectSchema = joi.object({
      DB: joi.string().default('postgres'),
      DB_HOST: joi.string().optional(),
      DB_PORT: joi.number().optional(),
      DB_NAME: joi.string(),
      DB_USER: joi.string().optional(),
      DB_PASS: joi.string().optional(),
      DB_SYNC: joi.boolean().default(false),
      DB_DROP: joi.boolean().default(false),

      JWT_SECRET: joi.string().default('secretKey'),

      SMTP_HOST: joi
        .string()
        .hostname()
        .optional(),
      SMTP_PORT: joi
        .number()
        .port()
        .default(587),
      SMTP_SECURE: joi
        .boolean()
        .default(false)
        .optional(),
      SMTP_USER: joi.string().optional(),
      SMTP_PASS: joi.string().optional(),

      EMAIL_DIR: joi.string().default(resolve(`${__dirname}/../../emails`)),
    });

    const { error, value } = joi.validate(envConfig, schema);

    if (error) {
      throw new Error(`Config validator error: ${error.message}`);
    }

    return value;
  }
}
