import { performance } from 'node:perf_hooks';

import { UseCaseRequest } from './usecase.request';
import { Logger } from '@domain/shared';

abstract class BaseUseCase<IRequest extends UseCaseRequest, IResponse> {
  public async execute(request: IRequest): Promise<IResponse> {
    try {
      const startTime = performance.now();
      request.validate();
      const response = await this.performOperation(request);
      const endTime = performance.now();
      const useCaseExecutionTime = endTime - startTime;
      Logger.debug(`Use case execution time: ${useCaseExecutionTime}ms`);
      return response;
    } catch (error) {
      throw error;
    }
  }
  protected abstract performOperation(request: IRequest): Promise<IResponse>;
}

export { BaseUseCase };
