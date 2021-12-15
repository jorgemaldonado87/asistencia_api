//controller for the Asignatura model
const db = require('../models');

//import user model
const usuario = db.usuario;
const usuario_tipo_usuario = db.usuario_tipo_usuario;
const usuarios_curso = db.usuarios_curso;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
//create user method
//use export to make this method available for other files
//user has nombre, email, teléfono, password
//use create to create user
//password is hashed
exports.create = (req, res) => {

    //validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    //create user with sequelize model
    //user is in req.body.body
    usuario.create({
        rut: req.body.body.rut,
        nombre: req.body.body.nombre,
        email: req.body.body.email,
        //apellido_paterno
        //apellido_materno
        apellido_paterno: req.body.body.apellido_paterno,
        apellido_materno: req.body.body.apellido_materno,
        telefono: req.body.body.telefono,
        password: req.body.body.password,
        created_at: new Date(),
        updated_at: new Date(),
    }).then(data => {
        res.send(data);
    }
    ).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the user."
        });
    }
    );
};




//get all users method
//use export to make this method available for other files
//use findAll to get all users
//use select to get only the fields we need
//use json to get the data in json format
//use sort to sort the data by id
//use limit to limit the data to 10
//use offset to skip the first 10
//use then to handle the response
//use catch to handle the error
exports.getAll = (req, res) => {
    
    usuario.findAll({
        attributes: ['id_usuario', 'rut', 'nombre', 'email', 'apellido_paterno', 'apellido_materno', 'telefono'],
        order: [
            ['rut', 'ASC']
        ],
        include: [{
            model: db.tipo_usuario,
        }],
        where: {
            nombre: {[Op.like]: '%'+req.query.nombre+'%'},
            apellido_paterno: {[Op.like]: '%'+req.query.apellido_paterno+'%'},
            apellido_materno: {[Op.like]: '%'+req.query.apellido_materno+'%'},
            rut: {[Op.like]: '%'+req.query.rut+'%'},
        },
    }).then(data => {
        res.send(data);
    }
    ).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    }
    );
};

//getById method
//use export to make this method available for other files
//use findOne to get a user by id
//use select to get only the fields we need
//use json to get the data in json format
//use then to handle the response
//use catch to handle the error
exports.getById = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    usuario.findOne({
        attributes: ['id_usuario', 'rut', 'nombre', 'email', 'apellido_paterno', 'apellido_materno', 'telefono', 'password', 'created_at', 'updated_at'],
        where: {
            id_usuario: req.query.id
        },
        include: [{
            model: db.tipo_usuario,
        }]
    }).then(data => {
        res.send(data);
    }
    ).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    }
    );
}

//agregaTipo method
//use export to make this method available for other files
//use findOne to get a user by id
//use select to get only the fields we need
//use json to get the data in json format
//use then to handle the response
//use catch to handle the error
exports.agregarTipo = (req, res) => {

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    usuario.findOne({
        attributes: ['id_usuario'],
        where: {
            id_usuario: req.body.body.id_usuario
        }
    }).then(data => {
        usuario_tipo_usuario.create({
            id_usuario: data.id_usuario,
            id_tipo_usuario: req.body.body.id_tipo_usuario,
            created_at: new Date(),
            updated_at: new Date(),
        }).then(data1 => {

            res.send(data1);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });

        }
        ).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        }
        );
    });
}

//get usuarios by curso_id and promocion_id through usuarios_curso model
//use export to make this method available for other files
exports.getUsuariosByCursoPromocion = (req, res) => {

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    usuarios_curso.findAll({
        attributes: ['usuario_id'],
        where: {
            cursos_id: req.params.id_curso,
            promocion_id: req.params.id_promocion
        },
        include: [{
            model: usuario,
        }]
    }).then(data => {
        res.send(data);
    }
    ).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    }
    );
}


//get usuarios where tipo_usuario.nombre == 'Profesor' && usuarios.rut = req.params.rut
//use export to make this method available for other files
exports.getProfesorByRut = (req, res) => {

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    usuario.findOne({
        where: {
            rut: req.params.rut
        },
        include: [{
            model: db.tipo_usuario,
            where: {
                nombre: 'Profesores'
            }
        }]
    }).then(data => {
        res.send(data);
    }
    ).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    }
    );
}

//method to edit an user
//use export to make this method available for other files
//use findOne to get a user by id
//use update to update the user
//use json to get the data in json format
//use then to handle the response
//use catch to handle the error
exports.update = (req, res) => {
    
    if (!req.body) {
        res.status(400).send({
            message: "No puede enviar contenido vacío!"
        });
    }

    usuario.update({
        rut: req.body.body.rut,
        nombre: req.body.body.nombre,
        email: req.body.body.email,
        apellido_paterno: req.body.body.apellido_paterno,
        apellido_materno: req.body.body.apellido_materno,
        telefono: req.body.body.telefono,
        password: req.body.body.password,
        updated_at: new Date(),
    }, {
        where: {
            id_usuario: req.params.id
        }
    }).then(data => {
        res.send(data);
    }
    ).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    }
    );
}