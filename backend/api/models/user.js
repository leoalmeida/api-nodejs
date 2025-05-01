const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = app => {
    const User = new Schema ({
        id :  { type: String, required: true },
        name : { type: String, required: true },
        birthDate :  { type: String, required: true },
        phone :  { type: String, required: true },
        email :  { type: String, required: true },
        occupation :  { type: String, required: true },
        state :  { type: String, required: true },
        createdAt :  { type: String, required: true },
    });

    const userModel = mongoose.model('User', User);

    userModel.create({
        "id": "admin",
        "name": "Cliente 149501",
        "birthDate": "1966-10-23T03:00:00Z",
        "phone": "(32)11111111",
        "email": "email@email.com.br",
        "occupation": "Medico",
        "state": "SP",
        "createdAt": new Date()
      }).then(() => console.log('user1'));
    userModel.create({
        "id": uuid.v4(),
        "name": "Cliente 252",
        "birthDate": "1989-10-23T03:00:00Z",
        "phone": "(32)11111111",
        "email": "email@email.com.br",
        "occupation": "Analista de Sistemas",
        "state": "SP",
        "createdAt": new Date()
      }).then(() => console.log('user2'));
    userModel.create({
        "id": uuid.v4(),
        "name": "Cliente 252",
        "birthDate": "1989-10-23T03:00:00Z",
        "phone": "(32)11111111",
        "email": "email@email.com.br",
        "occupation": "Engenheiro",
        "state": "SP",
        "createdAt": new Date()
      }).then(() => console.log('user3'));


    return userModel;

}