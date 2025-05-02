// Controlador para lidar com operações relacionadas aos recursos
const resource = require('../models/resourceModel');

// Array simulando uma lista de items

// Função para listar Items
const listarItems = (req, res) => 
  resource.model.find({})
  .then((resources) => res.type('.json').status(200).json(resources))
  .catch(() => res.type('.json').status(404).json({
    message: 'Nenhum recurso foi encontrado.',
    success: false
  }));

// Função para pesquisar 1 Item
const getOneItem = (req, res) => 
  resource.model.findOne({ _id: req.params.id })
  .then((resource) => res.type('.json').status(200).json(resource))
  .catch(() => res.type('.json').status(404).json({
      message: 'Recurso não encontrado.',
      success: false,
      resources: req.params.id,
  }));

// Função para criar um novo item
const saveItem = (req, res) => 
  resource.model.create({
      name: req.body.name,
      type: req.body.type,
      location: req.body.location,
      status: req.body.status,
      createdBy: req.body.userid,
      createdAt: new Date()})
  .then((newResource) => res.type('.json').status(201).json(newResource))
  .catch(() => res.type('.json').status(400).json({
    message: 'Não foi possível salvar o recurso na base de dados',
    success: false,
    resources: req.body,
  }));

// Função para excluir um item
const removeItem = (req, res) => 
  resource.model.findOneAndDelete({ _id: req.params.id })
  .then(
      res.type('.json').status(200).json({
        message: 'Recurso deletado com sucesso!',
        success: true,
        resources: req.params.id,
      }))
  .catch((err) =>
      res.type('.json').status(400).json({
        message: err,
        success: false,
        resources: req.params.id,
      }));

// Função para atualizar um item existente
const updateItem = (req, res) => 
  resource.model.findOneAndUpdate({ _id: req.params.id },{
      name: req.body.name,
      status: req.body.status,
      lastModifiedBy: req.body.userid,
      lastModifiedAt: new Date()})
  .then((recurso) =>
      res.type('.json').status(200).json({
        message: 'Recurso atualizado com sucesso!',
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
module.exports = { listarItems, getOneItem, saveItem, removeItem, updateItem };