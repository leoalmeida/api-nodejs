const { stdout } = require('process');
const uuid = require('uuid');

module.exports = app => {
    const User = app.models.user;
    const controller = {};

    controller.list = (req, res) => 
              User.find({})
              .then((users) => res.status(200).json(users))
              .catch((err) => res.status(404).json({
                  message: 'Nenhum usuário foi encontrado.',
                  success: false
              }));

    controller.getOne = (req, res) => 
              User.findOne({ id: req.params.regid })
              .then((user) => res.status(200).json(user))
              .catch((err) => res.status(404).json({
                  message: 'Usuário não encontrado.',
                  success: false,
                  resources: req.params.regid,
              }));

    controller.save = (req, res) => 
              User.create({
                  id: uuid.v4(),
                  name: req.body.name,
                  birthDate: req.body.birthDate,
                  phone: req.body.phone,
                  email: req.body.email,
                  occupation: req.body.occupation,
                  state: req.body.state,
                  createdAt: new Date()})
              .then((newUser) => res.status(201).json(newUser))
              .catch((err) => res.status(400).json({
                message: 'Não foi possível salvar o usuário na base de dados',
                success: false,
                resources: req.body,
              }));
  
    controller.remove = (req, res) =>
              Resource.findOneAndDelete({ id: req.params.regid })
              .then(
                  res.status(200).json({
                    message: 'Usuário deletado com sucesso!',
                    success: true,
                    resources: req.params.regid,
                  }))
              .catch((err) =>
                  res.status(400).json({
                    message: err,
                    success: false,
                    resources: req.params.regid,
                  }));

    controller.update = (req, res) => 
              User.findOneAndUpdate({ id: req.params.regid },
                                        {name: req.body.name,
                                        birthDate: req.body.birthDate,
                                        phone: req.body.phone,
                                        email: req.body.email,
                                        occupation: req.body.occupation,
                                        state: req.body.state,
                                        createdAt: new Date()})
              .then((recurso) =>
                  res.status(200).json({
                    message: 'Usuário atualizado com sucesso!',
                    success: true,
                    resources: recurso,
                  }))
              .catch((err) =>  
                res.status(404).json({
                  message: 'Usuário não encontrado.',
                  success: false,
                  resources: req.params.regid,
                }));
  
    return controller;
  }