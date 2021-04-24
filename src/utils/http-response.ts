export class HttpResponse {
  code: number;
  message: string;
  data: any;

  constructor(code: number, message: string, data: any) {
    this.code = code;
    this.message = message;
    this.data = data;
  }

  static ok = (message: string, data: any = {}) => {
    return new HttpResponse(200, message, data);
  };

  static created = (message: string, data: any = {}) => {
    return new HttpResponse(201, message, data);
  };

  static badRequest = (message: string, data: any = {}) => {
    return new HttpResponse(400, message, data);
  };

  static unauthorized = (message: string, data: any = {}) => {
    return new HttpResponse(401, message, data);
  };

  static forbidden = (message: string, data: any = {}) => {
    return new HttpResponse(403, message, data);
  };

  static notFound = (message: string, data: any = {}) => {
    return new HttpResponse(404, message, data);
  };

  static unprocessableEntity = (message: string, data: any = {}) => {
    return new HttpResponse(422, message, data);
  };

  static internalServerError = (data: any = {}) => {
    return new HttpResponse(
      500,
      'Desculpa, o servidor não está respondendo! Tente novamente mais tarde!',
      data,
    );
  };
}
