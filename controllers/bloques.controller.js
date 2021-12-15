//controller for the bloques model
const db = require('../models');

//import bloques model
const bloques = db.bloques;

//get all bloques
exports.getAll = (req, res) => {
    bloques.findAll()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving bloques."
            });
        });
}


//method to get current bloque where current_time is between hora_inicio and hora_fin
//hora_inicio and hora fin format: hh:mm
//current_time is new Date()
exports.getCurrent = (req, res) => {
    
    //get new Date() formatted as hh:mm
    let date = new Date();
    let current_time = date.getHours() + ":" + date.getMinutes();
    bloques.findAll({
        where: {
            hora_inicio: {
                [db.Sequelize.Op.lte]: current_time
            },
            hora_fin: {
                //new date
                [db.Sequelize.Op.gte]: current_time
            }
        }
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving bloques."
        });
    });
}

