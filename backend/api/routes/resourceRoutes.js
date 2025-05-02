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

// routes/resourceRoutes.js

const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');

// Rotas para operações CRUD de recursos
router.route("/resource")
    .get(resourceController.listarItems)
    .post(resourceController.saveItem);

router.route('/resource/:id')
    .delete(resourceController.removeItem)
    .put(resourceController.updateItem)
    .get(resourceController.getOneItem);

module.exports = router;