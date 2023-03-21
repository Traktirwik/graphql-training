// noinspection JSAnnotator

import { Table, Column, Model, DataType, IsEmail } from 'sequelize-typescript';
import { IUserCreate, IUser } from '../utils/interfaces';

@Table
export class User extends Model<IUser, IUserCreate> implements IUser {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @IsEmail
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'refresh_token',
  })
  refreshToken?: string;
}
