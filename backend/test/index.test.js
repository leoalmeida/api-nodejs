const request = require('supertest')
const app = require('../server');

describe('Sanity test', () => {
  test('1 should equal 1', () => {
    expect(1).toBe(1)
  })
})

describe('Resource endpoint', () => {
  test('deve retornar um array de recursos', async () => {
    const res = await request(app)
      .get('/api/v1/resource')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual([])
  })
})