import express from 'express';
import { useExpressServer } from 'routing-controllers';

const app = express();

useExpressServer(app, {
  controllers: [`${__dirname}/controllers/**`],
  middlewares: [`${__dirname}/middlewares/**`],
  interceptors: [`${__dirname}/interceptors/**`],
});

export { app };
