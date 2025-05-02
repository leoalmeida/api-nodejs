// Definição de um modelo de Recurso 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema ({
    name : { type: String, required: true },
    type : { type: String, required: true },
    location :  { type: String, required: false },
    status :  { type: String, required: true },
    createdBy :  { type: String, required: true },
    createdAt :  { type: Date, required: true },
    lastModifiedBy :  { type: String, required: true },
    lastModifiedAt :  { type: Date, required: true }
});

const model = mongoose.model('Resource', schema);

// Exportando o model utilizado pelos controllers
module.exports = { model, schema };