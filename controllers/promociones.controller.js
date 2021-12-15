//controller for the promociones model
//use db from models
//define promociones model from db.promociones
const db = require('../models');

const promociones = db.promociones;
const cursos = db.cursos;

//method to get all promociones
exports.getAll = (req, res) => {
    promociones.findAll()
        .then(promociones => {
            res.send(promociones);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

//method to create a new promociones
//promociones has id_promocion, ano, periodo, fecha_desde, fecha_hasta
exports.create = (req, res) => {


    if (!req.body.body.ano) {
        return res.status(400).send({
            message: "ano can not be empty"
        });
    }

    if (!req.body.body.periodo) {
        return res.status(400).send({
            message: "periodo can not be empty"
        });
    }

    if (!req.body.body.fecha_desde) {
        return res.status(400).send({
            message: "fecha_desde can not be empty"
        });
    }

    if (!req.body.body.fecha_hasta) {
        return res.status(400).send({
            message: "fecha_hasta can not be empty"
        });
    }

    //use promociones.create method to create a new promociones
    promociones.create({
        ano: req.body.body.ano,
        periodo: req.body.body.periodo,
        fecha_desde: req.body.body.fecha_desde,
        fecha_hasta: req.body.body.fecha_hasta
    }).then(promociones => {
        //get all cursos from db.cursos
        //assign cursos to promociones.cursos
        cursos.findAll()
            .then(cursos => {
                promociones.setCursos(cursos);
            }
            );
        res.send(promociones);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });



};

//method to get a promociones by id
//use where id_promocion = query param to get a promociones
//include cursos realated to promociones
exports.getById = (req, res) => {
    promociones.findByPk(req.params.id_promocion, {
        include: [{
            model: db.cursos,
            as: 'cursos',
            include: [{
                model: db.tipo_curso,
                as: 'tipo_curso'
            }]
        }]
    })
        .then(promociones => {
            res.send(promociones);
        }
        )
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        }
        );
};


