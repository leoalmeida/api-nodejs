/**
 * Defines the routes for the resource API.
 *
 * @param {object} app - The application instance.
 * @property {object} app.controllers.resource - The resource controller containing the route handlers.
 *
 * Routes:
 * - GET /: Retrieves a list of resources.
 * - POST /: Creates a new resource.
 * - DELETE /:regid: Deletes a specific resource by ID.
 * - PUT /:regid: Updates a specific resource by ID.
 * - GET /:regid: Retrieves a specific resource by ID.
 */
module.exports = app => {
    const controller = app.controllers.resource;
    app.route("/api/v1/resource")
        .get(controller.list)
        .post(controller.save);

    app.route('/api/v1/resource/:regid')
        .delete(controller.remove)
        .put(controller.update)
        .get(controller.getOne);
}