//define sequelize model to relation cursos with promociones as many to many relationship
// db.promocion_cursos = require("./promocion_cursos.model.js")(sequelize, Sequelize);

module.exports = function(sequelize, Sequelize) {
    var promocion_Cursos = sequelize.define('promocion_cursos', {
        id_promocion: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_curso: {
            type: Sequelize.INTEGER,
            primaryKey: true
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return promocion_Cursos;
};