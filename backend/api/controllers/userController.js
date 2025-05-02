// Controlador para lidar com operações relacionadas aos recursos
 const user = require('../models/userModel');

// Função para listar Items
const listarItems  = (req, res) => 
    user.model.find({})
    .then((users) => res.type('.json').status(200).json(users))
    .catch(() => res.type('.json').status(404).json({
        message: 'Nenhum usuário foi encontrado.',
        success: false
    }));

// Função para pesquisar 1 Item
const getOneItem = (req, res) => 
    user.model.findOne({ _id: req.params.id })
    .then((user) => res.type('.json').status(200).json(user))
    .catch(() => res.type('.json').status(404).json({
        message: 'Usuário não encontrado.',
        success: false,
        resources: req.params.id,
    }));

// Função para criar um novo item
const saveItem = (req, res) => 
    user.model.create({
        name: req.body.name,
        birthDate: req.body.birthDate,
        phone: req.body.phone,
        email: req.body.email,
        occupation: req.body.occupation,
        state: req.body.state,
        createdAt: new Date()})
    .then((newUser) => res.type('.json').status(201).json(newUser))
    .catch(() => res.type('.json').status(400).json({
      message: 'Não foi possível salvar o usuário na base de dados',
      success: false,
      resources: req.body,
    }));


// Função para excluir um item
const removeItem  = (req, res) =>
    user.model.findOneAndDelete({ _id: req.params.id })
    .then(
        res.type('.json').status(200).json({
          message: 'Usuário deletado com sucesso!',
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
const updateItem  = (req, res) => 
    user.model.findOneAndUpdate({ _id: req.params.id },
                              {name: req.body.name,
                              birthDate: req.body.birthDate,
                              phone: req.body.phone,
                              email: req.body.email,
                              occupation: req.body.occupation,
                              state: req.body.state,
                              createdAt: new Date()})
    .then((recurso) =>
        res.type('.json').status(200).json({
          message: 'Usuário atualizado com sucesso!',
          success: true,
          resources: recurso,
        }))
    .catch(() =>  
      res.type('.json').status(404).json({
        message: 'Usuário não encontrado.',
        success: false,
        resources: req.params.id,
      }));  

// Exportando os controladores para serem utilizados em outros arquivos
module.exports = { listarItems, getOneItem, saveItem, removeItem, updateItem };