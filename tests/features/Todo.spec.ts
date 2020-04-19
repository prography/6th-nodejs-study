import supertest from 'supertest';
import { app } from '../../src/app';
import { PrismaClient } from '@prisma/client';

describe('test Todo', () => {
  const client = supertest(app);
  test('test index todos', async () => {
    const response = await client.get('/todos');
    expect(response.status).toBe(200);
    const actual = await new PrismaClient().todo.findOne({
      where: { id: Number(response.body.id) },
    });
    expect(actual.description).toBe(response.body.description);
    expect(actual.title).toBe(response.body.title);
  });
});
