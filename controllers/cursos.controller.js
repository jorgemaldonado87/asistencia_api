//controller for the Asignatura model
const db = require('../models');

//cursos has id, nombre, tipo_curso_id
const cursos = db.cursos;
const usuarios_curso = db.usuarios_curso;


//export findAll method to get all cursos
//include tipo_curso relation
exports.findAll = (req, res) => {
    cursos.findAll({
        include: [{
            model: db.tipo_curso,
            as: 'tipo_curso'
        }]
    }).then(cursos => {
        res.send(cursos);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving cursos."
        });
    });
};



//getById method to get a single curso
exports.getById = (req, res) => {
    cursos.findByPk(req.params.id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        });
}

//create method to create a new curso
exports.create = (req, res) => {
    // Validate request
    if (!req.body.body.nombre) {
        res.status(400).send({
            message: "Curso content can not be empty"
        });
        return;
    }

    // Create a Tutorial
    const curso = {
        nombre: req.body.body.nombre,
        tipo_curso_id: req.body.body.tipo_curso_id
    };

    // Save Tutorial in the database
    cursos.create(curso)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Tutorial."
            });
        });
}


//method to get promocion_cursos by curso_id and promocion_id
exports.getPromocionCursos = (req, res) => {
    //get promocion_cursos by curso_id and promocion_id
    db.promocion_cursos.findAll({
        where: {
            id_curso: req.params.id_curso,
            id_promocion: req.params.id_promocion
        },
        include: [{
            model: db.promociones,

        },
        {
            model: db.cursos,
            include: [{
                model: db.tipo_curso,
            }]

        }]
    }).then(promocion_cursos => {

        res.send(promocion_cursos);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving promocion_cursos."
        });
    });




}

//method to get curso by id_curso
//include promociones relation
exports.getCursoById = (req, res) => {
    cursos.findByPk(req.params.id_curso, {
        include: [{
            model: db.promociones,
            as: 'promociones'
        },
        {
            model: db.tipo_curso,
        }]
    }).then(curso => {
        res.send(curso);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving curso."
        });
    });
}


//get ultima promocion_curso by curso_id and promocion_id
exports.getUltimaPromocionCurso = (req, res) => {
    //get promocion_cursos by curso_id and promocion_id

    //get promocion by id
    db.promociones.findByPk(req.params.id_promocion).then(promocion => {
        db.promocion_cursos.findOne({
            where: {
                id_curso: req.params.id_curso,
            },
            include: [{
                model: db.promociones,
                where: {
                    fecha_hasta: {
                        [db.Sequelize.Op.lte]: promocion.fecha_desde
                    }
                }
    
            },
            {
                model: db.cursos,
                include: [{
                    model: db.tipo_curso,
                }]
    
            }]
        }).then(promocion_cursos => {
            //get the last promocion_curso
           
            res.send(promocion_cursos);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving promocion_cursos."
            });
        });

    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving promociones."
            });
        });
    
}

//method to create usuario_curso
exports.createUsuariosCurso = (req, res) => {
    // Validate request
    if (!req.body.body.cursos_id || !req.body.body.cursos_id) {
        res.status(400).send({
            message: "Usuario_curso content can not be empty"
        });
        return;
    }


    // Create a Usuario_curso
    const usuario_curso = {
        usuario_id: req.body.body.usuario_id,
        cursos_id: req.body.body.cursos_id,
        promocion_id: req.body.body.promociones_id,
        tipo_usuario_id: 7,  
    };

    // Save Usuario_curso in the database
    usuarios_curso.create(usuario_curso)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Usuario_curso."
            });
        });
}
