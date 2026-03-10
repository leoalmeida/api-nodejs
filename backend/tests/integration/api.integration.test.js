jest.mock('../../config/db', () => ({
  connect: jest.fn(),
}));

jest.mock('../../api/models/resourceModel', () => ({
  model: {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    findOneAndUpdate: jest.fn(),
    findOneAndDelete: jest.fn(),
  },
}));

jest.mock('../../api/models/userModel', () => ({
  model: {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    findOneAndUpdate: jest.fn(),
    findOneAndDelete: jest.fn(),
  },
}));

const request = require('supertest');
const app = require('../../config/express');
const resource = require('../../api/models/resourceModel');
const user = require('../../api/models/userModel');

describe('API integration', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('GET /api/v1/resource deve retornar 200 com recursos', async () => {
    resource.model.find.mockResolvedValue([{ _id: 'r1', name: 'vm-1' }]);

    const response = await request(app).get('/api/v1/resource');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ _id: 'r1', name: 'vm-1' }]);
  });

  it('POST /api/v1/resource deve retornar 201 ao criar recurso', async () => {
    resource.model.create.mockResolvedValue({ _id: 'r2', name: 'novo' });

    const response = await request(app)
      .post('/api/v1/resource')
      .send({ name: 'novo', type: 'storage', status: 'running', userid: 'u1' });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ _id: 'r2', name: 'novo' });
  });

  it('GET /api/v1/status deve retornar 404 quando find falhar', async () => {
    resource.model.find.mockRejectedValue(new Error('db down'));

    const response = await request(app).get('/api/v1/status');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'Nenhum recurso foi encontrado.',
      success: false,
    });
  });

  it('PUT /api/v1/status/:id/:status deve retornar 200', async () => {
    resource.model.findOneAndUpdate.mockResolvedValue({
      _id: 'r1',
      status: 'stopped',
    });

    const response = await request(app)
      .put('/api/v1/status/r1/stopped')
      .send({ userid: 'admin' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: 'Status atualizado com sucesso!',
        success: true,
      })
    );
  });

  it('GET /api/v1/user deve retornar 200 com lista de usuários', async () => {
    user.model.find.mockResolvedValue([{ _id: 'u1', name: 'Leo' }]);

    const response = await request(app).get('/api/v1/user');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ _id: 'u1', name: 'Leo' }]);
  });

  it('POST /api/v1/user deve retornar 400 em erro de validação', async () => {
    user.model.create.mockRejectedValue(new Error('validation error'));

    const response = await request(app)
      .post('/api/v1/user')
      .send({ name: 'Novo Usuario', email: 'x@x.com' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: 'Não foi possível salvar o usuário na base de dados',
        success: false,
      })
    );
  });
});
