import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    switch (exception.code) {
      case 'P2002': {
        const status = HttpStatus.CONFLICT;
        response.status(status).json({
          statusCode: status,
          message: `field '${exception.meta.target}' already exists in database`,
        });
        break;
      }
      case 'P2003': {
        const status = HttpStatus.CONFLICT;
        const field = (exception.meta.field_name as string).split('_')[1];
        response.status(status).json({
          statusCode: status,
          message: `field '${field}' does not exists in database`,
        });
        break;
      }
      default:
        super.catch(exception, host);
        break;
    }
  }
}
