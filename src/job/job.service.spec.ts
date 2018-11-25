import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@src/config/config.module';
import { JobItem } from '@src/job/job-item.class';
import { Job } from './job.processor';
import { JobService } from './job.service';

describe('JobService', () => {
  let service: JobService;
  let onProcess: (job: Job<any>) => any;

  const processor = async (job: Job<any>) => {
    if (onProcess) {
      onProcess(job);
    }
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobService],
      imports: [ConfigModule],
    }).compile();
    service = module.get<JobService>(JobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should process jobs', (done: () => any) => {
    onProcess = job => {
      expect(job.data.payload).toBeDefined();
      expect(job.data.payload).toEqual('test');
      done();
      return;
    };

    service.registerProcessor('*', processor);
    service.dispatch(JobItem.create('test'));
  });

  afterAll(async () => {
    await service.shutdown();
  });
});
