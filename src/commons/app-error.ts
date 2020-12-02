import { BaseError } from 'make-error';

export class AppError<T extends Error = any> extends BaseError {
  constructor(message: string, public readonly cause?: T) {
    super(message);
    this.addCauseToStack();
  }

  toString(): string {
    let str = this.message;
    if (this.cause) {
      str += ` (caused by: ${this.cause.toString()})`;
    }
    return str;
  }

  private addCauseToStack(): void {
    if (this.cause) {
      this.stack += `\nCaused by: ${this.cause.stack}`;
    }
  }
}
