//sequelize model for cursos
//cursos.model.js
//cursos has id, nombre, tipo_curso_id
//cursos has one tipo_curso
//cursos has many usuarios (many to many)

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('cursos', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tipo_curso_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        classMethods: {
            associate: function (models) {
                cursos.belongsTo(models.tipo_curso, {
                    foreignKey: 'tipo_curso_id',
                    onDelete: 'CASCADE'
                });
                /*cursos.belongsToMany(models.usuarios, {
                    through: 'usuarios_cursos',
                    foreignKey: 'curso_id'
                }); */
            },

        }
    });
};

