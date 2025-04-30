
module.exports = app => {
    const resourceDB = app.data.resources;
    const controller = {};

    const {
      resources: resourceMock,
      } = resourceDB;
  
    controller.list = (req, res) => res.status(200).json(resourceMock.data.map((element) => ({id: element.id, status: element.status})));
    
    controller.get = (req, res) => res.status(200).json(
                    resourceMock.data
                      .filter(item => item.id === req.params.regid)
                      .map((element) => ({id: element.id, status: element.status})));
    
    controller.update = (req, res) => {
      const { 
        regid,
      } = req.params;
  
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