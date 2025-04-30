// Status.js - Módulo que implementa a rota de Status.

module.exports = app => {
  const controller = app.controllers.status;
  
  // Status api route.
  app.route("/api/v1/status")
    .get(controller.list);

  app.route('/api/v1/status/:regid')
    .put(controller.update)
    .get(controller.get);
}