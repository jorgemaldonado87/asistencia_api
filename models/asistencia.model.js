//sequelize model for asistencia
//asistencia has id_asistencia,fecha,status,bloque_id,asignaturas_id,cursos_id,alumno_id,profesor_id
//asistencia has one alumno, one profesor, one asignatura, one curso, one bloque
//alumno and profesor are usuarios

module.exports = function(sequelize, DataTypes) {
    var asistencia = sequelize.define('asistencia', {
        id_asistencia: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bloque_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        asignaturas_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cursos_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        alumno_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        profesor_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'asistencia'
    });
    
    return asistencia;
};