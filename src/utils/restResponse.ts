import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { stringValidation } from './commonFunctions';
import {
  API_ERROR_CODE,
  API_ERROR_MESSAGE,
  API_FORBIDDEN_CODE,
  API_FORBIDDEN_MESSAGE,
  API_NO_CONTENT_CODE,
  API_NO_CONTENT_MESSAGE,
  API_NOT_FOUND_CODE,
  API_NOT_FOUND_MESSAGE,
  API_SUCCESS_CODE,
  API_SUCCESS_MESSAGE,
  API_UNAUTHORIZED_CODE,
  API_UNAUTHORIZED_MESSAGE,
} from './constants';
import { ResponseModel } from './responseModel';
import { isEmpty } from 'lodash';

export class RestResponse {
  static success = async (dataList: any, receivedMessage?: string) => {
    if (stringValidation(receivedMessage)) {
      receivedMessage = API_SUCCESS_MESSAGE;
    }
    return {
      message: receivedMessage,
      statusCode: API_SUCCESS_CODE,
      data: dataList,
    };
  };

  // static noContent = async (
  //   dataList: any,
  //   receivedMessage: string,
  // ): Promise<ResponseModel> => {
  //   if (stringValidation(receivedMessage)) {
  //     receivedMessage = API_NO_CONTENT_MESSAGE;
  //   }
  //   if (dataList == null) {
  //     dataList = [];
  //   }
  //   throw new
  //   return {
  //     message: receivedMessage,
  //     statusCode: API_NO_CONTENT_CODE,
  //     data: dataList,
  //   };
  // };

  static error = async (
    dataList: any,
    pathToError?: any,
    receivedMessage?: any,
  ): Promise<ResponseModel> => {
    if (stringValidation(receivedMessage)) {
      receivedMessage = API_ERROR_MESSAGE;
    }
    throw new BadRequestException({
      message: receivedMessage,
      statusCode: API_ERROR_CODE,
      path: pathToError,
      data: dataList,
    });
  };

  static unauthorized = async (
    dataList: any,
    pathToError?: any,
    receivedMessage?: any,
  ): Promise<ResponseModel> => {
    if (!stringValidation(receivedMessage)) {
      receivedMessage = API_UNAUTHORIZED_MESSAGE;
    }
    throw new UnauthorizedException({
      message: receivedMessage,
      statusCode: API_UNAUTHORIZED_CODE,
      path: pathToError,
      data: dataList,
    });
  };

  static forbidden = async (
    dataList: any,
    pathToError?: any,
    receivedMessage?: any,
  ): Promise<ResponseModel> => {
    if (!stringValidation(receivedMessage)) {
      receivedMessage = API_FORBIDDEN_MESSAGE;
    }
    throw new ForbiddenException({
      message: receivedMessage,
      statusCode: API_FORBIDDEN_CODE,
      path: pathToError,
      data: dataList,
    });
  };

  static notFound = async (dataList: any, receivedMessage?: string) => {
    if (stringValidation(receivedMessage)) {
      receivedMessage = API_NOT_FOUND_MESSAGE;
    }
    throw new NotFoundException({
      message: receivedMessage,
      statusCode: API_NOT_FOUND_CODE,
      data: dataList,
    });
  };
}
