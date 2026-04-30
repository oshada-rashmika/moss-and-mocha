import { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';

export const requestLogger = morgan('dev');

export const stitchErrorLogger = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(
    `👽 [${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${err.message}`
  );
  next(err);
};
