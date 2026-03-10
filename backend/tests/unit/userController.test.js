const controller = require('../../api/controllers/userController');
const user = require('../../api/models/userModel');

const makeRes = () => {
  const res = {};
  res.type = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('userController unit', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('listarItems deve retornar 200 com usuários', async () => {
    const usuarios = [{ _id: '1', name: 'Leo' }];
    jest.spyOn(user.model, 'find').mockResolvedValue(usuarios);

    const res = makeRes();
    await controller.listarItems({}, res);

    expect(user.model.find).toHaveBeenCalledWith({});
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(usuarios);
  });

  it('saveItem deve retornar 400 quando create falhar', async () => {
    jest
      .spyOn(user.model, 'create')
      .mockRejectedValue(new Error('erro-create'));

    const req = {
      body: {
        name: 'Novo',
        birthDate: '1990-01-01',
        phone: '1111',
        email: 'novo@teste.com',
        occupation: 'dev',
        state: 'SP',
      },
    };
    const res = makeRes();

    await controller.saveItem(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Não foi possível salvar o usuário na base de dados',
        success: false,
      })
    );
  });

  it('updateItem deve retornar 200 quando atualizar usuário', async () => {
    jest
      .spyOn(user.model, 'findOneAndUpdate')
      .mockResolvedValue({ _id: '2', name: 'Atualizado' });

    const req = {
      params: { id: '2' },
      body: {
        name: 'Atualizado',
        birthDate: '1990-01-01',
        phone: '2222',
        email: 'a@a.com',
        occupation: 'qa',
        state: 'RJ',
      },
    };
    const res = makeRes();

    await controller.updateItem(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Usuário atualizado com sucesso!',
        success: true,
      })
    );
  });
});
