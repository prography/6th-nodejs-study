import { app } from '../../src/app';
import supertest from 'supertest';

const agent = supertest(app);

describe('test todo', () => {
  let todoId = 1;

  test('create', async () => {
    const response = await agent.post('/todos');
    todoId = response.body.data.id || todoId;
    expect(response.status).toBe(200);
  });

  test('index', async () => {
    const response = await agent.get('/todos');
    expect(response.status).toBe(200);
  });

  test('retrieve', async () => {
    const response = await agent.get(`/todos/${todoId}`);
    expect(response.status).toBe(200);
  });

  test('update', async () => {
    const response = await agent.put(`/todos/${todoId}`).send({
      name: 'updated name',
    });
    expect(response.status).toBe(200);
  });

  test('delete', async () => {
    const response = await agent.delete(`/todos/${todoId}`);
    expect(response.status).toBe(200);
  });
});
