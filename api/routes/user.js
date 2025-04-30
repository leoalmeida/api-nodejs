// User.js - Módulo que implementa a rota de Status.

module.exports = app => {
  const controller = app.controllers.user;
  
  // User api route.
  app.route("/api/v1/user")
    .get(controller.list)
    .post(controller.save);

  app.route('/api/v1/user/:regid')
    .delete(controller.remove)
    .put(controller.update)
    .get(controller.getOne);
}