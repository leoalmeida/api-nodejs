const uuid = require('uuid');

module.exports = app => {
    const Resource = app.models.resource;
    const controller = {};
  
    controller.list = (req, res) => 
                Resource.find({})
                .then((resources) => res.status(200).json(resources))
                .catch((err) => res.status(404).json({
                  message: 'Nenhum recurso foi encontrado.',
                  success: false
                }));
    controller.getOne = (req, res) => 
              Resource.findOne(req.params.regid)
              .then((resource) => res.status(200).json(resource))
              .catch((err) => res.status(404).json({
                  message: 'Recurso não encontrado.',
                  success: false,
                  resources: req.params.regid,
              }));
    controller.save = (req, res) => 
              Resource.create({
                  id: uuid.v4(),
                  name: req.body.name,
                  type: req.body.type,
                  location: req.body.location,
                  status: req.body.status,
                  createdBy: req.body.userid,
                  createdAt: new Date()})
              .then((newResource) => res.status(201).json(newResource))
              .catch((err) => res.status(400).json({
                message: 'Não foi possível salvar o recurso na base de dados',
                success: false,
                resources: req.body,
              }));
  
    controller.remove = (req, res) => 
              Resource.findOneAndDelete({ id: req.params.regid })
              .then(
                  res.status(200).json({
                    message: 'Recurso deletado com sucesso!',
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
              Resource.findOne({ id: req.params.regid })
              .updateOne({
                  name: req.body.name,
                  status: req.body.status,
                  lastModifiedBy: req.body.userid,
                  lastModifiedAt: new Date()})
              .then((recurso) =>
                  res.status(200).json({
                    message: 'Recurso atualizado com sucesso!',
                    success: true,
                    resources: recurso,
                  }))
              .catch((err) =>  
                res.status(404).json({
                  message: 'Recurso não encontrado.',
                  success: false,
                  resources: req.params.regid,
                }));
  
    
    
    return controller;
  }