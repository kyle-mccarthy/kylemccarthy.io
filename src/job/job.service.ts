import { Injectable } from '@nestjs/common';
import { ConfigService } from '@src/config/config.service';
import { JobItem } from '@src/job/job-item.class';
import { Job, JobProcessor } from '@src/job/job.processor';

import Bull from 'bull';

type ProcessorClass<T> = JobProcessor<JobItem<T>>;
type ProcessorFunction<T> =
  | ((job: Job<T>) => Promise<any>)
  | ((job: Job<T>, cb: () => any) => any);
type Processor<T> = ProcessorClass<JobItem<T>> | ProcessorFunction<JobItem<T>>;

@Injectable()
export class JobService {
  private readonly queue: Bull.Queue;

  constructor(private readonly configService: ConfigService) {
    this.queue = new Bull('job-queue', {
      redis: this.configService.getRedisConfig(),
    });
  }

  /**
   * Get the queue object
   */
  public getQueue() {
    return this.queue;
  }

  public dispatch<T = any>(job: JobItem<T>, options?: Bull.JobOptions) {
    return this.queue.add(job.getProcessorName(), job, options);
  }

  /**
   * Accepts a processor object, function, or name and function
   */
  public registerProcessor<T>(
    processorOrName: Processor<T> | string,
    callback?: ProcessorFunction<T>,
  ) {
    if (processorOrName instanceof JobProcessor) {
      const processor = processorOrName;
      this.queue.process(
        processor.getName(),
        processor.getConcurrency(),
        processor.process,
      );
    } else if (typeof processorOrName === 'function') {
      this.queue.process(processorOrName);
    } else if (typeof processorOrName === 'string' && callback) {
      this.queue.process(processorOrName, callback);
    }
  }

  public shutdown() {
    return this.queue.close();
  }
}
