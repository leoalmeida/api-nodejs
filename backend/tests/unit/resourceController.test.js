const controller = require('../../api/controllers/resourceController');
const resource = require('../../api/models/resourceModel');

const makeRes = () => {
  const res = {};
  res.type = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('resourceController unit', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('listarItems deve retornar 200 com lista de recursos', async () => {
    const recursos = [{ _id: '1', name: 'hub-1' }];
    jest.spyOn(resource.model, 'find').mockResolvedValue(recursos);

    const res = makeRes();
    await controller.listarItems({}, res);

    expect(resource.model.find).toHaveBeenCalledWith({});
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(recursos);
  });

  it('getOneItem deve retornar 404 quando model falhar', async () => {
    jest.spyOn(resource.model, 'findOne').mockRejectedValue(new Error('boom'));

    const req = { params: { id: 'abc' } };
    const res = makeRes();
    await controller.getOneItem(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Recurso não encontrado.',
      success: false,
      resources: 'abc',
    });
  });

  it('saveItem deve retornar 201 com recurso criado', async () => {
    const body = {
      name: 'vm-01',
      type: 'vm',
      location: 'eastus',
      status: 'running',
      userid: 'user-1',
    };

    jest
      .spyOn(resource.model, 'create')
      .mockResolvedValue({ _id: '10', ...body, createdBy: body.userid });

    const req = { body };
    const res = makeRes();
    await controller.saveItem(req, res);

    expect(resource.model.create).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
  });
});
