//import express
//import routes
const express = require('express');
const router = express.Router();
const bloquesController = require('../controllers/bloques.controller');

//getAll bloques
router.get('/', bloquesController.getAll);

//getCurrent bloque
router.get('/current', bloquesController.getCurrent);

//expport router
module.exports = router;