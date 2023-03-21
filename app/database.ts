/* eslint-disable no-console */
import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { Dialect } from 'sequelize';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD,
  {
    models: [__dirname + '/models'],
    dialect: process.env.DB_DIALECT as Dialect,
    host: process.env.DB_HOST,
  }
);

async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection to database has been established successfully.');

    await sequelize.sync();
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export { sequelize, connectToDatabase };
