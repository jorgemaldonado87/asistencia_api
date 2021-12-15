//sequelize model for promociones
//promociones.model.js
//promociones has id_promocion, ano, periodo, fecha_desde, fecha_hasta
//promociones has many cursos
//cursos has many promociones

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('promociones', {
        id_promocion: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ano: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        periodo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fecha_desde: {
            type: DataTypes.DATE,
            allowNull: false
        },
        fecha_hasta: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'promociones'
    });
};