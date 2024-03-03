export class ErrorBase<T> extends Error {
  errors: T[];
  message: string;

  constructor({ errors, message }: { errors: T[]; message: string }) {
    super();
    this.errors = errors;
    this.message = message;
  }
}
