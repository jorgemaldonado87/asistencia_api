const Sequelize = require("sequelize");
//define dbConfig
const dbConfig = require("../config/db.config.js");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.asignatura = require("./asignatura.model.js")(sequelize, Sequelize);
db.tipo_curso = require("./tipo_curso.model.js")(sequelize, Sequelize);
//define user model
db.usuario = require("./usuario.model.js")(sequelize, Sequelize);
//define tipo_usuario model
db.tipo_usuario = require("./tipo_usuario.model.js")(sequelize, Sequelize);

//define usuario_tipousuario
db.usuario_tipo_usuario = require("./usuario_tipo_usuario.model.js")(sequelize, Sequelize);

//define promocion_cursos
db.promocion_cursos = require("./promocion_cursos.model.js")(sequelize, Sequelize);

//define asistencia model
db.asistencia = require("./asistencia.model.js")(sequelize, Sequelize);

db.cursos = require("./cursos.model.js")(sequelize, Sequelize);

//usuario belongsToMany tipo_usuario through usuario_tipo_usuario
db.usuario.belongsToMany(db.tipo_usuario, {
  through: "usuario_tipo_usuario",
  foreignKey: "id_usuario"
});
//tipo_usuario belongsToMany usuario through usuario_tipo_usuario
db.tipo_usuario.belongsToMany(db.usuario, {
  through: "usuario_tipo_usuario",
  foreignKey: "id_tipo_usuario"
});

//relation of asistencia with usiario on asistencia.alumno_id = usuario.id as alumno
db.asistencia.belongsTo(db.usuario, {
  foreignKey: "alumno_id",
  as: "alumno"
});

//relation of asistencia with usuario on asistencia.profesor_id = usuario.id as profesor
db.asistencia.belongsTo(db.usuario, {
  foreignKey: "profesor_id",
  as: "profesor"
});



//promociones model
db.promociones = require("./promociones.model.js")(sequelize, Sequelize);

//usuarios_curso model
db.usuarios_curso = require("./usuarios_curso.model.js")(sequelize, Sequelize);

//usuarios belongsToMany cursos and promociones through usuarios_curso
db.usuarios_curso.belongsTo(db.usuario, {
  foreignKey: "usuario_id"
});
db.usuarios_curso.belongsTo(db.cursos, {
  foreignKey: "id_curso"
});
db.usuarios_curso.belongsTo(db.promociones, {
  foreignKey: "id_promocion"
});

//relate usuarios_curso with tipo_usuario
db.usuarios_curso.belongsTo(db.tipo_usuario, {
  foreignKey: "tipo_usuario_id"
});

db.tipo_usuario.hasMany(db.usuarios_curso, {
  foreignKey: "tipo_usuario_id"
});

db.cursos.hasMany(db.usuarios_curso, {
  foreignKey: "cursos_id"
});

db.promociones.hasMany(db.usuarios_curso, {
  foreignKey: "id_promocion"
});

db.usuario.hasMany(db.usuarios_curso, {
  foreignKey: "id_usuario"
});


//cursos belongsToMany promociones through promocion_cursos
db.cursos.belongsToMany(db.promociones, {
  through: "promocion_cursos",
  foreignKey: "id_curso"
});

//promociones belongsToMany cursos through promocion_cursos
db.promociones.belongsToMany(db.cursos, {
  through: "promocion_cursos",
  foreignKey: "id_promocion"
});

db.promocion_cursos.hasMany(db.cursos, {
  foreignKey: "id"
});

db.promocion_cursos.hasMany(db.promociones, {
  foreignKey: "id_promocion"
});

//define model bloques
db.bloques = require("./bloques.model.js")(sequelize, Sequelize);

//define relation bloques with asistencia
db.bloques.hasMany(db.asistencia, {
  foreignKey: "bloque_id"
});

//defile relation of asistencia with bloques
db.asistencia.belongsTo(db.bloques, {
  foreignKey: "bloque_id"
});

//define relation of asistencia with cursos
db.asistencia.belongsTo(db.cursos, {
  foreignKey: "cursos_id"
});


//cursos belongsTo tipo_curso through cursos
db.cursos.belongsTo(db.tipo_curso, {
  foreignKey: "tipo_curso_id"
});

module.exports = db;