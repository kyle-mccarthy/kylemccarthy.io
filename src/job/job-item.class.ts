export class JobItem<T = any> {
  public static create<T>(payload: T, processorName: string = '*') {
    return new JobItem(payload, processorName);
  }
  constructor(public payload: T, public processorName: string = '*') {}

  public getData() {
    return {
      payload: this.payload,
      metadata: {
        processor: this.processorName,
      },
    };
  }

  public getMetadata() {
    return {
      processor: this.processorName,
    };
  }

  public getPayload() {
    return this.payload;
  }

  public getProcessorName() {
    return this.processorName;
  }
}
