import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { Response } from 'express';
import { ValidationError as SequelizeValidationError } from 'sequelize';
import { ValidationError } from 'yup';
import ApiError from './api-error';
import { isHttpError } from 'http-errors';

export const errorHandler = (
  err: any,
  res: Response
): GraphQLFormattedError<Record<string, any>> => {
  // Логирование ошибки
  // eslint-disable-next-line no-console
  console.error(err);

  // Создание объекта с ошибкой, который будет отправлен клиенту
  const error = {
    message: 'Internal server error',
  };

  // Определение статуса и сообщения в зависимости от типа ошибки
  if (err.originalError instanceof SequelizeValidationError) {
    res.status(400);
    error.message = err.originalError.message;
  } else if (
    err.originalError instanceof GraphQLError ||
    err instanceof GraphQLError
  ) {
    res.status(400);
    error.message = err.message;
  } else if (err.originalError instanceof ValidationError) {
    res.status(400);
    error.message = err.message;
  } else if (err.originalError instanceof ApiError) {
    res.status(err.originalError.status);
    error.message = err.originalError.message;
  } else if (isHttpError(err.originalError)) {
    res.status(400);
    error.message = `invalid json in body: ${err.message}`;
  } else {
    res.status(500);
  }

  return error;
};
