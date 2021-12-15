//import express
//import routes
const express = require('express');
const router = express.Router();

//usuariosController
const usuariosController = require('../controllers/usuario.controller');


//create route
router.post('/', usuariosController.create);


//getAll route
router.get('/', usuariosController.getAll);

//getById route
router.get('/getById', usuariosController.getById);

router.post('/agregarTipo', usuariosController.agregarTipo);

router.get('/getUsuarios/:id_curso/:id_promocion', usuariosController.getUsuariosByCursoPromocion);

router.get('/profesor/getByRut/:rut', usuariosController.getProfesorByRut);

router.post('/:id', usuariosController.update);

//export router
module.exports = router;