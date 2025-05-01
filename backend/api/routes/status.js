/**
 * Defines the routes for the status API.
 *
 * @param {object} app - The Express application instance.
 * @property {object} app.controllers.status - The controller for handling status-related logic.
 *
 * Routes:
 * - GET /: Retrieves a list of status entries.
 * - PUT /:regid: Updates a specific status entry by its ID.
 * - GET /:regid: Retrieves a specific status entry by its ID.
 */

module.exports = app => {
    const controller = app.controllers.status;
    // Status api route.
    app.route("/")
        .get(controller.list);

    app.route('/:regid')
        .put(controller.update)
        .get(controller.getOne);
}