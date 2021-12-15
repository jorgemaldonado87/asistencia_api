//controller for the tipo_usuario model
//use db from models
//define tipo_usuario model from db.tipo_usuario
//define tipo_usuario_controller
const db = require('../models');
const tipo_usuario = db.tipo_usuario;


//method to create tipo_usuario
//use export
//define create method  
exports.create = function (req, res) {
    //create tipo_usuario and return it
    //use req.body.body
    tipo_usuario.create(req.body.body).then(tipo_usuario_aux => {
        //return tipo_usuario
        res.send(tipo_usuario_aux);
    }).catch(err => {
        //return error
        res.status(401).send("Error -> " + err);
    });
}

//method to list all tipo_usuario
//use export
//define getAll method 
exports.getAll = function (req, res) {
    //find all tipo_usuario and return it
    //use findAll
    tipo_usuario.findAll().then(tipo_usuario_aux => {
        //return tipo_usuario
        res.send(tipo_usuario_aux);
    }).catch(err => {
        //return error
        res.status(401).send("Error -> " + err);
    });
}
