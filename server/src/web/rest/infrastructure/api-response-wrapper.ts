import { Nullable } from '@domain/shared';
import { Property } from '@tsed/schema';

class ApiResponse<T> {
  @Property()
  success: boolean;

  @Property()
  message: string;

  @Property()
  data: Nullable<T>;

  constructor(success: boolean, message: string, data: Nullable<T> = null) {
    this.success = success;
    this.message = message;
    this.data = data;
  }

  static success<T>(
    data: T,
    message: string = 'Operation successful',
  ): ApiResponse<T> {
    return new ApiResponse(true, message, data);
  }

  static failure<T>(message: string): ApiResponse<T> {
    return new ApiResponse(false, message);
  }
}

export { ApiResponse };
