import { JobItem } from '@src/job/job-item.class';
import Bull from 'bull';

export type Job<T> = Bull.Job<JobItem<T>>;

export abstract class JobProcessor<T> {
  protected processorName: string;
  protected concurrency: number;

  constructor(processorName: string, concurrency = 1) {
    this.processorName = processorName;
    this.concurrency = concurrency;
  }

  public abstract process(job: Job<T>): Promise<any>;

  public getConcurrency(): number {
    return this.concurrency;
  }

  public getName(): string {
    return this.processorName;
  }
}
