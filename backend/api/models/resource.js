const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = () => {
    const Resource = new Schema ({
        id :  { type: String, required: true },
        name : { type: String, required: true },
        type : { type: String, required: true },
        location :  { type: String, required: false },
        status :  { type: String, required: true },
        createdBy :  { type: String, required: true },
        createdAt :  { type: Date, required: true },
        lastModifiedBy :  { type: String, required: true },
        lastModifiedAt :  { type: Date, required: true }
    });
    const model = mongoose.model('Resource', Resource);
    model.exists({}).then((resources) => {
        if (resources) return;
        
        console.log('Criando dados iniciais de recursos');
    
        const createdDate= new Date();
        model.create({
            "id":  uuid.v4(),
            "name": "hub7943981185795460",
            "type": "accounts",
            "location": "eastus",
            "properties": {},
            "status": "running",
            "createdBy": "admin",
            "createdAt": createdDate,
            "lastModifiedBy": "admin",
            "lastModifiedAt": createdDate
            
        }).then(() => console.log('resource'));
        model.create({
            "id":  uuid.v4(),
            "name": "projai795460",
            "type": "project",
            "location": "eastus",
            "status": "running",
            "createdBy":  "admin",
            "createdAt": createdDate,
            "lastModifiedBy": "admin",
            "lastModifiedAt": createdDate
            
        }).then(() => console.log('resource'));
        model.create({
            "id":  uuid.v4(),
            "name": "space794398",
            "type": "hub",
            "location": "eastus",
            "properties": {},
            "status": "stopped",
            "createdBy": "admin",
            "createdAt":   createdDate,
            "lastModifiedBy": "admin",
            "lastModifiedAt": createdDate
        }).then(() => console.log('resource'));
        model.create({
            "id":  uuid.v4(),
            "name": "st981185795460",
            "type": "storage",
            "location": "eastus",
            "status": "stopped",
            "createdBy": "admin",
            "createdAt":  createdDate,
            "lastModifiedBy": "admin",
            "lastModifiedAt":  createdDate,
        }).then(() => console.log('resource'));
    })

    return model;
    
}