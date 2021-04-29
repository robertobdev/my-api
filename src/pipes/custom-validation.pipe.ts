import {
  ArgumentMetadata,
  BadRequestException,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { HttpResponse } from '../utils/http-response';

export class CustomValidationPipe extends ValidationPipe {
  public async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    try {
      return await super.transform(value, metadata);
    } catch (e) {
      if (e instanceof BadRequestException) {
        const messages = e.getResponse()['message'];

        const validations = new Map<string, string>();
        for (const message of messages) {
          const separateMessage = message.split(':');
          validations[separateMessage[0]] = separateMessage[1];
        }

        throw new UnprocessableEntityException(
          HttpResponse.unprocessableEntity('Não foi possivel validar.', [
            validations,
          ]),
        );
      }
    }
  }
}
