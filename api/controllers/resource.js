const uuid = require('uuid');

module.exports = app => {
    const resourceDB = app.data.resources;
    const controller = {};

    const {
        resources: resourceMock,
      } = resourceDB;
  
    controller.list = (req, res) => res.status(200).json(resourceMock.data);

    controller.getOne = (req, res) => res.status(200).json(resourceMock.data.find(item => item.id === req.params.regid)||{});

    controller.save = (req, res) => {
      data = new Date();
      resourceMock.data.push({
        id: uuid.v4(),
        name: req.body.name,
        type: req.body.type,
        location: req.body.location,
        properties: req.body.properties,
        status: req.body.status,
        systemData: {
          createdBy: req.body.userid,
          createdByType: "User",
          createdAt: data,
          lastModifiedBy: req.body.userid,
          lastModifiedByType: "User",
          lastModifiedAt: data
        }
      });
  
      res.status(201).json(resourceMock);
    };
  
    controller.remove = (req, res) => {
      const {
        regid,
      } = req.params;
  
      console.log("remove >>> " + regid);

      const foundItemIndex = resourceMock.data.findIndex(resource => resource.id === regid);
  
      if (foundItemIndex === -1) {
        res.status(404).json({
          message: 'Recurso não encontrado.',
          success: false,
          resources: resourceMock,
        });
      } else {
        resourceMock.data.splice(foundItemIndex, 1);
        res.status(200).json({
          message: 'Recurso deletado com sucesso!',
          success: true,
          resources: resourceMock,
        });
      }
    };

    controller.update = (req, res) => {
      const { 
        regid,
      } = req.params;

      console.log("update >>> " + regid);
  
      const foundItemIndex = resourceMock.data.findIndex(resource => resource.id === regid);
  
      if (foundItemIndex === -1) {
        res.status(404).json({
          message: 'Recurso não encontrado.',
          success: false,
          resources: resourceMock,
        });
      } else {
        const changedItem = resourceMock.data.get(foundItemIndex);
        
        changedItem.name = req.body.name;
        changedItem.properties= req.body.properties;
        changedItem.status = req.body.status;
        changedItem.status = req.body.status;
        changedItem.systemData.lastModifiedBy = req.body.userid;
        changedItem.systemData.lastModifiedByType = "User";
        changedItem.systemData.lastModifiedAt = new Date();
          
      
        
        resourceMock.data.splice(foundItemIndex, 1, changedItem);
        
        res.status(200).json({
          message: 'Recurso atualizado com sucesso!',
          success: true,
          resources: resourceMock,
        });
      }
    }
  
    return controller;
  }