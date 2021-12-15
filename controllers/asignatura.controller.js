//controller for the Asignatura model
const db = require('../models');
const asignatura = db.asignatura;

//export findAll function to be used in the routes
exports.findAll = (req, res) => {
    return asignatura.findAll();
}

//get asignatura by id
exports.findById = (id) => {
    return asignatura.findByPk(id);
}

//create asignatura
exports.create = (req, res) => {
    asignatura.create({
        nombre: req.body.body.nombre,
       
    }).then(asignatura => {
        res.send(asignatura);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the asignatura."
        });
    });
}
