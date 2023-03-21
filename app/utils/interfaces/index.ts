import { Optional } from 'sequelize';

export interface ISignIn {
  email: string;
  password: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  refreshToken?: string;
}

export interface IUserCreate extends Optional<IUser, 'id'> {
  name: string;
  email: string;
  password: string;
  passwordCheck: string;
}

export interface IUserUpdate {
  name?: string;
  email?: string;
  password?: string;
  refreshToken?: string;
}
