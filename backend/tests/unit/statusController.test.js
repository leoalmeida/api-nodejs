const controller = require('../../api/controllers/statusController');
const resource = require('../../api/models/resourceModel');

const makeRes = () => {
  const res = {};
  res.type = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('statusController unit', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('listarItems deve retornar status dos recursos', async () => {
    const recursos = [{ _id: '1', status: 'running' }];
    jest.spyOn(resource.model, 'find').mockResolvedValue(recursos);

    const res = makeRes();
    await controller.listarItems({}, res);

    expect(resource.model.find).toHaveBeenCalledWith({}, 'id status');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(recursos);
  });

  it('updateItem deve retornar 200 quando atualizar status', async () => {
    jest
      .spyOn(resource.model, 'findOneAndUpdate')
      .mockResolvedValue({ _id: '1', status: 'stopped' });

    const req = {
      params: { id: '1', status: 'stopped' },
      body: { userid: 'admin' },
    };
    const res = makeRes();

    await controller.updateItem(req, res);

    expect(resource.model.findOneAndUpdate).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Status atualizado com sucesso!',
        success: true,
      })
    );
  });

  it('getOneItem deve retornar 404 em erro de busca', async () => {
    jest.spyOn(resource.model, 'findOne').mockRejectedValue(new Error('erro'));

    const req = { params: { id: 'id-invalido' } };
    const res = makeRes();

    await controller.getOneItem(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Recurso não encontrado.',
      success: false,
      resources: 'id-invalido',
    });
  });
});
