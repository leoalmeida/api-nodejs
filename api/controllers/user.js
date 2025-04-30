const { stdout } = require('process');
const uuid = require('uuid');

module.exports = app => {
    const userDB = app.data.users;
    const controller = {};
  
    const {
      users: userMock,
    } = userDB;

    controller.list = (req, res) => res.status(200).json(userMock.data);
  
    controller.getOne = (req, res) => res.status(200).json(userMock.data.find(item => item.id === req.params.regid)||{});


    controller.save = (req, res) => {
      data = new Date();
      userMock.data.push({
        id: uuid.v4(),
        name: req.body.name,
        birthDate: req.body.birthDate,
        phone: req.body.phone,
        email: req.body.email,
        occupation: req.body.occupation,
        state: req.body.state,
        createdAt: new Date()
      });
  
      res.status(201).json(userMock);
    };
  
    controller.remove = (req, res) => {
      const {
        regid,
      } = req.params;

      console.log("remove >>> " + regid);
  
      const foundItemIndex = userMock.data.findIndex(user => user.id === regid);
  
      if (foundItemIndex === -1) {
        res.status(404).json({
          message: 'Usuário não encontrado.',
          success: false,
          resources: userMock,
        });
      } else {
        userMock.data.splice(foundItemIndex, 1);
        res.status(200).json({
          message: 'Usuário deletado com sucesso!',
          success: true,
          resources: userMock,
        });
      }
    };

    controller.update = (req, res) => {
      const { 
        regid,
      } = req.params;

      console.log("update >>> " + regid);
  
      const foundItemIndex = userMock.data.findIndex(user => user.id === regid);
  
      if (foundItemIndex === -1) {
        res.status(404).json({
          message: 'Usuário não encontrado.',
          success: false,
          resources: userMock,
        });
      } else {
        const changedItem = userMock.data.get(foundItemIndex);
        changedItem.name= req.body.name,
        changedItem.birthDate= req.body.birthDate,
        changedItem.phone= req.body.phone,
        changedItem.email= req.body.email,
        changedItem.occupation= req.body.occupation,
        changedItem.state= req.body.state,
        changedItem.createdAt= new Date()
        
        userMock.data.splice(foundItemIndex, 1, changedItem);
        
        res.status(200).json({
          message: 'Usuário atualizado com sucesso!',
          success: true,
          resources: userMock,
        });
      }
    }

    return controller;
  }