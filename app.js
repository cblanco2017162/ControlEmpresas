const express = require('express');
const cors = require('cors');
var app = express();

const UsuarioRutas = require('./src/routes/usuarios.routes');
const EmpleadoRutas = require('./src/routes/empleados.routes');
const EmpresaRutas = require('./src/routes/empresas.routes');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(cors());

app.use('/api', UsuarioRutas, EmpleadoRutas, EmpresaRutas);

module.exports = app;