//import express
//import routes
const express = require('express');
const router = express.Router();
const tipoUsuarioController = require('../controllers/tipo_usuario.controller');

//create route
router.post('/create', tipoUsuarioController.create);

//get all route in /
router.get('/', tipoUsuarioController.getAll);

//export router
module.exports = router;