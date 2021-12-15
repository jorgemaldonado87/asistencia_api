module.exports = function(sequelize, Sequelize) {
    var tipo_curso = sequelize.define('tipo_curso', {
        id_tipo_curso: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
        freezeTableName: true,
    });
    return tipo_curso;
  };