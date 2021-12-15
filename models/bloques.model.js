//sequelize model for bloques
//bloque has id, nombre, hora_inicio, hora_fin

module.exports = function(sequelize, DataTypes) {
    var bloques = sequelize.define('bloques', {
        id_bloques: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hora_inicio: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hora_fin: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return bloques;
}