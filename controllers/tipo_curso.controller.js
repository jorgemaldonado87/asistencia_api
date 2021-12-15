//controller for the tipo_curso model
//use db from models
//define tipo_curso model from db.tipo_curso

const db = require('../models');
const tipo_curso = db.tipo_curso;

//export findAll function
//return messages in spanish language
//return all tipo_curso
//async function
exports.findAll = async (req, res) => {
    tipo_curso.findAll().then(tipo_curso => {
        res.send(tipo_curso);
    }
    ).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving tipo_curso."
        });
    });
};


//getById function
//return messages in spanish language
//return tipo_curso by id
exports.getById = (req, res) => {
    return tipo_curso.findByPk(req.params.id);
}

//create function
//return messages in spanish language
//create tipo_curso
exports.create = (req, res) => {
    //create tipo_curso with try and catch
    //use res.send to return the result
    //use res.status to return error
    
    try {
        return res.send(tipo_curso.create({
            nombre: req.body.body.nombre
        }));
    }
    catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the tipo_curso."
        });
    }

}