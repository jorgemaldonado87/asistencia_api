const express = require('express')
const app = express()
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
const port = 3000

const cors = require('cors');
app.use(cors());
const db = require("./models");

db.sequelize.sync();

//import asignaturas routes and assing it to the app
const asignaturasRoutes = require('./routes/asignatura.routes.js')
app.use('/asignaturas', asignaturasRoutes);

//import tipo_curso routes and assing it to the app
const tipo_cursoRoutes = require('./routes/tipo_curso.routes.js')
app.use('/tipo_curso', tipo_cursoRoutes);

//import auth routes and assing it to the app
const authRoutes = require('./routes/auth.routes.js')
app.use('/auth', authRoutes);

//import tipo_usuario routes and assing it to the app
const tipo_usuarioRoutes = require('./routes/tipo_usuario.routes.js')
app.use('/tipo_usuario', tipo_usuarioRoutes);

//import usuarios routes
const usuariosRoutes = require('./routes/usuario.routes.js')
app.use('/usuarios', usuariosRoutes);

const cursosRoutes = require('./routes/cursos.routes.js')
app.use('/cursos', cursosRoutes);

//import promociones routes
const promocionesRoutes = require('./routes/promociones.routes.js')
app.use('/promociones', promocionesRoutes);

//import bloques routes
const bloquesRoutes = require('./routes/bloques.routes.js')
app.use('/bloques', bloquesRoutes);

//import asistencia routes
const asistenciaRoutes = require('./routes/asistencia.routes.js')
app.use('/asistencia', asistenciaRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://192.168.18.39:${port}`)
})
