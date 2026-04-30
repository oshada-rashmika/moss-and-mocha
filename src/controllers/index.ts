import { Request, Response } from 'express';
import { getHelloMessage } from '../services';

export const helloController = (req: Request, res: Response) => {
  const message = getHelloMessage();
  res.json({ message });
};
