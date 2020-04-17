import supertest from 'supertest';
import { app } from '../../src/app';

const assertItem = item => {
  const expectedKeys = ['id', 'title', 'description', 'author'];
  Object.keys(item).forEach(key => {
    const idx = expectedKeys.indexOf(key);
    if (idx > -1) {
      expectedKeys.splice(idx, 1);
    }
  });
  expect(expectedKeys).toBe([]);
};

describe('test Todo', () => {
  const client = supertest(app);

  test('test index todos', async () => {
    const response = await client.get('/todos');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    for (const item of response.body) {
      assertItem(item);
    }
  });
});
