//import express
//import routes
const express = require('express');
const router = express.Router();
const asistenciaController = require('../controllers/asistencia.controller');

//post asistencia to database
router.post('/', asistenciaController.create);

router.get('/byDay', asistenciaController.getAsistenciaByMonth);
//byBloque
router.get('/byBloque', asistenciaController.getAsistenciaByBloqueAndDate);
module.exports = router;