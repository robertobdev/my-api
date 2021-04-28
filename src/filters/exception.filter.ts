import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { HttpResponse } from '../utils/http-response';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const exceptionResponse =
      exception instanceof HttpException ? exception.getResponse() : exception;
    const result = CustomExceptionFilter.handleResponseMessage(
      exceptionResponse,
    );
    return response.status(result.status).json(result.responseData);
  }

  private static handleResponseMessage(exception: any) {
    let status = 500;
    // TODO -> tirar exception quando for pra produção
    let responseData = HttpResponse.internalServerError(exception);

    if (exception instanceof HttpResponse) {
      responseData = exception;
      status = exception.code;
    } else {
      console.log(exception);
    }

    return {
      status: status,
      responseData: responseData,
    };
  }
}
