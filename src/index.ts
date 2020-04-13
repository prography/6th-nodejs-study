import 'reflect-metadata';
import { app } from './app';
import dotenv from 'dotenv';

dotenv.config();

const HOST = process.env.HOST || 'localhost';
const PORT = Number(process.env.PORT || 3000);

const startApplication = async () => {
  // data base 연결
  app.listen(PORT, HOST, () => {
    console.log(`server is running on ${HOST}:${PORT}`);
  });
};

startApplication();
