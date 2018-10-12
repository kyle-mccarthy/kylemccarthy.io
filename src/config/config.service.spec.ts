import { Test, TestingModule } from '@nestjs/testing';
import * as dotenv from 'dotenv';
import { ConfigService } from './config.service';

jest.mock('dotenv');

const mockParse = dotenv.parse as jest.Mock<typeof dotenv.parse>;

describe('ConfigService', () => {
  let service: ConfigService;

  beforeAll(async () => {
    service = new ConfigService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should reject invalid config', () => {
    mockParse.mockImplementationOnce((args) => {
      return { test: 1 };
    });

    expect(() => {
      service = new ConfigService();
    }).toThrow();
  });
});
