//define sequelize model to relation usuarios with cursos as many to many relationship
// db.usuarios_curso = require("./usuarios_curso.model.js")(sequelize, Sequelize);

module.exports = function(sequelize, Sequelize) {
    var usuarios_curso = sequelize.define('usuarios_Curso', {
        id_usuarios_curso: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        usuario_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        cursos_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        promocion_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        tipo_usuario_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    }, {
        timestamps: false,
        freezeTableName: true
    });
    return usuarios_curso;
}