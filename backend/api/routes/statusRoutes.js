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
// routes/statusRoutes.js

const express = require('express');
const router = express.Router();
const statusController = require('../controllers/statusController');

// Rotas para operações de gestão de status dos recursos

// Status api route.
router.route("/status")
    .get(statusController.listarItems);

router.route('/status/:id')
    .get(statusController.getOneItem);

router.route('/status/:id/:status')  
    .put(statusController.updateItem)

module.exports = router;