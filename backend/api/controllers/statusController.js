// Controlador para lidar com operações relacionadas a consulta de status
const resource = require('../models/resourceModel');

// Função para listar Items
const listarItems  = (req, res) => 
  resource.model.find({}, 'id status')
    .then((resources) => res.type('.json').status(200).json(resources))
    .catch(() => res.type('.json').status(404).json({
      message: 'Nenhum recurso foi encontrado.',
      success: false
    }));

// Função para pesquisar 1 Item
const getOneItem  = (req, res) => 
  resource.model.findOne({ _id: req.params.id }, 'id status')
    .then((resource) => res.type('.json').status(200).json(resource))
    .catch(() => res.type('.json').status(404).json({
        message: 'Recurso não encontrado.',
        success: false,
        resources: req.params.id,
    }));

// Função para atualizar um item existente
const updateItem = (req, res) => 
  resource.model.findOneAndUpdate({ _id: req.params.id },
            {status: req.params.status,
            lastModifiedBy: req.body.userid,
            lastModifiedAt: new Date()})
    .then((recurso) =>
    res.type('.json').status(200).json({
      message: 'Status atualizado com sucesso!',
      success: true,
      resources: recurso,
    }))
    .catch(() =>  
    res.type('.json').status(404).json({
      message: 'Recurso não encontrado.',
      success: false,
      resources: req.params.id,
    }));
      

// Exportando os controladores para serem utilizados em outros arquivos
module.exports = { listarItems, getOneItem, updateItem };