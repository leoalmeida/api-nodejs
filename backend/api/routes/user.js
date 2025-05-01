/**
 * Defines the routes for user-related operations in the API.
 *
 * @param {object} app - The Express application instance.
 * @property {object} app.controllers.user - The user controller containing route handlers.
 *
 * Routes:
 * - GET /: Retrieves a list of users.
 * - POST /: Creates a new user.
 * - DELETE /:regid: Deletes a user by their registration ID.
 * - PUT /:regid: Updates a user by their registration ID.
 * - GET /:regid: Retrieves a single user by their registration ID.
 */

module.exports = app => {
    const controller = app.controllers.user;
    // User api route.
    app.route("/")
        .get(controller.list)
        .post(controller.save);

    app.route('/:regid')
        .delete(controller.remove)
        .put(controller.update)
        .get(controller.getOne);

}