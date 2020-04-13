import { app } from '../src/app';
import supertest from 'supertest';

const agent = supertest(app);

describe('test start', () => {
  test('test', async () => {
    const response = await agent.get('/hello-world');
    expect(response.status).toBe(200);
  });
});
