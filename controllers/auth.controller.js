//controller for the Asignatura model
const db = require('../models');

//import user model
const usuario = db.usuario;

//login method
exports.login = (req, res) => {
  
  
    usuario.findOne({
        where: {
            email: req.query.email
        },
        include: [{
            model: db.tipo_usuario
        }]
    }).then(usuario => {
 
        if (usuario) {
            if (usuario.password == req.query.password) {
                //unset the password
                usuario.password = undefined;
                res.status(200).json({
                    message: "Sesión iniciada correctamente",
                    usuario: usuario
                });
            } else {
                res.status(401).json({
                    message: "Contraseña incorrecta."
                });
            }
        } else {
            res.status(401).json({
                message: "Invalid Email"
            });
        }
    }).catch(err => {
        res.status(500).json({
            message: "Error in Login",
            error: err
        });
    });
};

//register method
//user has id_usuario,rut,nombre,email,telefono,password,created_at,updated_at,deleted_at
//return messages in spanish language
exports.register = (req, res) => {
    user.create({
        rut: req.body.rut,
        nombre: req.body.nombre,
        email: req.body.email,
        telefono: req.body.telefono,
        password: req.body.password
    }).then(user => {
        res.status(200).json({
            message: "User registrado satisfactoriamente",
            user: user
        });
    }).catch(err => {
        res.status(500).json({
            message: "Error al registrar el usuario",
            error: err
        });
    });
}


