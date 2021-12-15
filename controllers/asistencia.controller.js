//controller for the asistencia model
const db = require('../models');
const asistencia = db.asistencia;
const usuario = db.usuario;
const Sequelize = require("sequelize");
//asistencia has id_asistencia,fecha,status,bloque_id,asignaturas_id,cursos_id,alumno_id,profesor_id


//create asistencia
exports.create = (req, res) => {

    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Create a asistencia
    const asistenciaAux = {
        fecha: req.body.body.fecha,
        status: req.body.body.status,
        bloque_id: req.body.body.bloque_id,
        asignaturas_id: req.body.body.asignaturas_id,
        cursos_id: req.body.body.cursos_id,
        alumno_id: req.body.body.alumno_id,
        profesor_id: req.body.body.profesor_id
    };
    // Save asistencia in the database
    asistencia.create(asistenciaAux)
        .then(data => {
            //get asistencia by id where id_asistencia = data.id_asistencia including alumno relation
            asistencia.findByPk(data.id_asistencia, {
                include: ['alumno']
            }).then(asistencia => {
                res.send(asistencia);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving asistencia."
                });
            });


        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the asistencia."
            });
        });



}

//get all alumnos that have assist at day
exports.getAsistenciaByMonth = (req, res) => {
    asistencia.findAll({
        attributes: [
            [Sequelize.fn('COUNT', Sequelize.col('alumno_id')), 'alumnos'],
            [Sequelize.fn('DATE_FORMAT', Sequelize.col('fecha'), '%m-%d'), 'dia'],
        ],
        group: ['dia'],
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving asistencias."
        });
    });
}

//get all alumnos that have assist at day

exports.getAllAlumnosAsistencia = (req, res) => {
    asistencia.findAll({
        attributes: [
            [Sequelize.fn('COUNT', Sequelize.col('alumno_id')), 'alumnos'],
            [Sequelize.fn('DATE_FORMAT', Sequelize.col('fecha'), '%m-%d'), 'dia'],
            'status',
            'bloque_id',
            'cursos_id',
        ],
        include: ['bloque', 'curso'],
        group: ['cursos_id', 'dia', 'bloque_id', 'status'],
        order: ['fecha', 'cursos_id']
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving asistencias."
        });
    });
}

//get asistencias by bloque_id
exports.getAsistenciaByBloqueAndDate = (req, res) => {
    asistencia.findAll({
        attributes: [
            [Sequelize.fn('COUNT', Sequelize.col('alumno_id')), 'alumnos'],

            [Sequelize.fn('DATE_FORMAT', Sequelize.col('fecha'), '%m-%d'), 'dia'],
            'status',
            'bloque_id',
            'cursos_id',
        ],
        where: {
            bloque_id: req.query.bloque_id,
            fecha: {
                [db.Sequelize.Op.gte]: req.query.fecha
              }
        },
        include: ['bloque', 'curso'],
        group: ['dia', 'bloque_id', 'status'],
        order: ['fecha', 'cursos_id']
    }).then(data => {
        
        //if data is emty return data
        if (data.length == 0) {
            var response = {
                total_alumnos: 0,
                ausentes: 0,
                presentes: 0
            };
            res.send(response);
        }
        //select count of users with tipo_usuario.nombre = 'Alumnos'
        usuario.findAll({
            attributes: [
                [Sequelize.fn('COUNT', Sequelize.col('id')), 'alumnos'],
            ],
            include: [
                {
                    model: db.tipo_usuario,
                    where: {
                        nombre: 'Alumnos'
                    }
                }
            ]
        }).then(alumnos => {
           //convert alumnos to object
           alumnos = alumnos[0].toJSON();
           
            //filter data where status = 0 as asentes
            ausentes = data.filter(d => d.status == 0)[0];
            presentes = data.filter(d => d.status == 1)[0];

            if(ausentes != undefined){
                ausentes = ausentes.toJSON();
            }
            if(presentes != undefined){
                presentes = presentes.toJSON();
            }
       
            //conver ausentes to object
            
                
            var response = {
                total_alumnos: alumnos.alumnos ,
                ausentes: 0,
                presentes: 0
            };

            if(presentes != undefined){
                response.presentes = presentes.alumnos;
            }
            if(ausentes != undefined){
                response.ausentes = ausentes.alumnos;
            }

            res.json(response);

        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving asistencias."
            });
        });



     
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving asistencias."
        });
    });
}


