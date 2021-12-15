
//define tipo_usuario model module.export = serialize
//tipo_usuario has id, nombre, tipo
module.exports = function (sequelize, DataTypes) {
    var tipo_usuario = sequelize.define('tipo_usuario', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },

    }, {
        timestamps: false,
        freezeTableName: true
    });
    return tipo_usuario;
};

