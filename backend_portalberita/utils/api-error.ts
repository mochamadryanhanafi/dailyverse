interface ApiErrorParams {
  status: number;
  message?: string;
  errors?: any[];
  stack?: string;
}

class ApiError extends Error {
  public status: number;
  public data: null;
  public success: boolean;
  public errors: any[];

  constructor({
    status,
    message = 'Something went wrong',
    errors = [],
    stack = '',
  }: ApiErrorParams) {
    super(message);

    this.name = 'ApiError';
    this.status = status;
    this.data = null;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
