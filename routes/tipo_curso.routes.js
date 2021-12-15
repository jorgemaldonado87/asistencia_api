//import express
//import routes
const express = require('express');
const router = express.Router();
const tipo_cursoController = require('../controllers/tipo_curso.controller');

//findAll method to get all tipo_cursos from controller
router.get('/', tipo_cursoController.findAll);

//findAll method to get all tipo_cursos from controller
router.post('/', tipo_cursoController.create);

//export router
module.exports = router;