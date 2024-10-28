import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    let token =
      request.headers.authorization || request.headers['x-access-token'];
    token = token?.replace(/^Bearer\s+/, '');

    try {
      const verifiedToken = jwt.verify(token, process.env.JWT_CONSTANT);
      request.user = verifiedToken;
      return true;
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }
}

export default JwtAuthGuard;
