//sequelize model for asignaturas
//asignaturas has id and nombre


module.exports = function(sequelize, Sequelize) {
  var asignatura = sequelize.define('asignatura', {
    
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },{
      // don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false,

  // If don't want createdAt
  createdAt: false,

  // If don't want updatedAt
  updatedAt: false,

  // your other configuration here
  });
  return asignatura;
};