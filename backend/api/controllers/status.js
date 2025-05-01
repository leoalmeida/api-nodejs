module.exports = app => {
    const Resource = app.models.resource;
    const controller = {};
  
    controller.list = (req, res) => 
        Resource.find({}, 'id status')
        .then((resources) => res.status(200).json(resources))
        .catch((err) => res.status(404).json({
          message: 'Nenhum recurso foi encontrado.',
          success: false
        }));
    controller.getOne = (req, res) => 
        Resource.findOne({ id: req.params.regid }, 'id status')
        .then((resource) => res.status(200).json(resource))
        .catch((err) => res.status(404).json({
            message: 'Recurso não encontrado.',
            success: false,
            resources: req.params.regid,
        }));
    
    controller.update = (req, res) => 
        User.findOneAndUpdate({ id: req.params.regid },
                {status: req.body.status,
                lastModifiedBy: req.body.userid,
                lastModifiedAt: new Date()})
        .then((recurso) =>
        res.status(200).json({
          message: 'Status atualizado com sucesso!',
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