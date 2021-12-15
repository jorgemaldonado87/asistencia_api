//import express
//import routes
const express = require('express');
const router = express.Router();
//import asignatura controller
const asignaturaController = require('../controllers/asignatura.controller');



//define asignatura routes
router.get('/', (req, res) => {
    //use sequelize to get all asignaturaController findAll;
    asignaturaController.findAll().then(asignaturas => {
        res.json(asignaturas);
    }
    ).catch(err => {
        res.send('error: ' + err);
    }
    );

}
);

//find by id route
router.get('/:id', (req, res) => {
    //use sequelize to get all asignaturaController findAll;

    asignaturaController.findById(req.params.id).then(asignatura => {
        res.send(asignatura);
    }
    ).catch(err => {
        res.send('error: ' + err);
    }
    );
});

//create asignatura
router.post('/',asignaturaController.create);

//export router
module.exports = router;