import { sign } from 'jsonwebtoken';
import { Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const generateAccessToken = (userId: number, res: Response) => {
  const token = sign({ userId }, process.env.JWT_ACCESS_KEY as string, {
    expiresIn: '15m',
  });
  res.cookie('access_token', token, {
    httpOnly: true,
  });
};

const generateRefreshToken = (userId: number, res: Response) => {
  const token = sign({ userId }, process.env.JWT_REFRESH_KEY as string, {
    expiresIn: '30d',
  });

  res.cookie('refresh_token', token, {
    httpOnly: true,
  });
  return token;
};

export default {
  generateAccessToken,
  generateRefreshToken,
};
