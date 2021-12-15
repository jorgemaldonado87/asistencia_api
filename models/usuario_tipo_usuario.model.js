//define sequelize model to relation usuario with tipo_usuario as many to many relationship
// db.usuario_tipo_usuario = require("./usuario_tipo_usuario.model.js")(sequelize, Sequelize);
module.exports = function(sequelize, Sequelize) {
    const usuario_tipo_usuario = sequelize.define('usuario_tipo_usuario', {
        id_usuario: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            //add reference to usuarios table
            references: {
                model: 'usuarios',
                key: 'id'
            }

        },
        id_tipo_usuario: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            //add reference to tipo_usuario table
            references: {
                model: 'tipo_usuario',
                key: 'id'
            }
        },
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return usuario_tipo_usuario;
}