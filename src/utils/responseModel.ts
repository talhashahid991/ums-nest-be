export class ResponseModel {
  constructor(
    public message: string,
    public statusCode: number,
    public data: any[],
    public path?: any,
  ) {}
}
