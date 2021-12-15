//import express
//import routes
const express = require('express');
const router = express.Router();

//declare promocioneScontroller
const promocionesController = require('../controllers/promociones.controller');


//routes
router.get('/', promocionesController.getAll);

//route post to create a new promocion
router.post('/', promocionesController.create);

//route get to get a promocion by id
router.get('/:id_promocion', promocionesController.getById);

//export router
module.exports = router;