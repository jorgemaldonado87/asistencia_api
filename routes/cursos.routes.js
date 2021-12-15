//import express
//import routes
const express = require('express');
const router = express.Router();
const cursosController = require('../controllers/cursos.controller');


//get all route in /
router.get('/', cursosController.findAll);

//get all route in /
router.post('/', cursosController.create);

//get promocion_curso by id_curso and id_promocion
router.get('/:id_curso/:id_promocion', cursosController.getPromocionCursos);

//get ultima promocion curso by id_curso and id_promocion
router.get('/ultima/:id_curso/:id_promocion', cursosController.getUltimaPromocionCurso);

//get curso by id_curso
router.get('/:id_curso', cursosController.getCursoById);

//route to create usuarios_curso
router.post('/usuarios_curso', cursosController.createUsuariosCurso);

//export router
module.exports = router;