// Resource.js - Módulo que implementa a rota de Resources.

module.exports = app => {
    const controller = app.controllers.resource;
    
    // Status api route.
    app.route("/api/v1/resource")
      .get(controller.list)
      .post(controller.save);
  
    app.route('/api/v1/resource/:regid')
      .delete(controller.remove)
      .put(controller.update)
      .get(controller.getOne);
  }